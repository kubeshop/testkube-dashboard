import {LogProcessorLine} from './LogProcessorLine';
import {ANSI_MARKER} from './utils';

interface VisualLine {
  index: number;
  line: LogProcessorLine;
  start: number;
  end: number;
}

// TODO: Avoid lazy processing?
export class LogProcessor {
  private lines: LogProcessorLine[] = [];
  private activeLine: LogProcessorLine | undefined = undefined;
  public maxDigits = 0;

  public append(log: string, start = 0, end = log.length): void {
    let startLine = start;
    let noAsciiDecode = true;
    for (let i = start; i < end; i += 1) {
      if (log[i] === '\n') {
        if (this.activeLine) {
          this.activeLine.append(log, startLine, i, noAsciiDecode);
          this.activeLine = undefined;
        } else {
          this.lines.push(new LogProcessorLine(log, startLine, i, noAsciiDecode));
        }
        startLine = i + 1;
        noAsciiDecode = true;
      } else if (log[i] === ANSI_MARKER) {
        noAsciiDecode = false;
      }
    }

    if (startLine < end) {
      this.activeLine = new LogProcessorLine(log, startLine, end, noAsciiDecode);
      this.lines.push(this.activeLine);
    }

    // eslint-disable-next-line no-bitwise
    this.maxDigits = (Math.log(this.lines.length + 1) * Math.LOG10E + 1) | 0;
  }

  public getMaxLineLength(): number {
    return this.lines.reduce((max, line) => (max > line.chars ? max : line.chars), 0);
  }

  public getProcessedLines(start = 0, end = this.lines.length): LogProcessorLine[] {
    this.process(start, end);
    return this.lines.slice(start, end);
  }

  // TODO: Cache last results?
  public getVisualLineAt(maxCharacters: number, visualPos: number): VisualLine {
    if (visualPos < 0) {
      visualPos = 0;
    }
    if (maxCharacters === Infinity || maxCharacters === 0) {
      if (visualPos > this.lines.length) {
        visualPos = this.lines.length - 1;
      }
      return {index: visualPos, line: this.lines[visualPos], start: visualPos, end: visualPos + 1};
    }
    let start = 0;
    let end = 0;
    let index = 0;
    if (this.lines.length) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const chars = this.lines[index].chars;
        start = end;
        end += chars === 0 ? 1 : Math.ceil(chars / maxCharacters);
        if (end > visualPos || index === this.lines.length - 1) {
          break;
        }
        index += 1;
      }
    }
    return {line: this.lines[index], index, start, end};
  }

  // TODO: Cache results?
  public countVisualLines(maxCharacters: number, start = 0, end = this.lines.length): number {
    // Fast-track for invalid data
    if (end < start) {
      return 0;
    }
    if (start < 0) {
      start = 0;
    }
    if (end > this.lines.length) {
      end = this.lines.length;
    }

    // Fast-track for no wrapping
    if (maxCharacters === Infinity || maxCharacters === 0) {
      return end - start;
    }

    // Count the total lines
    let count = 0;
    for (let i = start; i < end; i += 1) {
      const chars = this.lines[i].chars;
      count += chars === 0 ? 1 : Math.ceil(chars / maxCharacters);
    }
    return count;
  }

  public process(start = 0, end = this.lines.length): void {
    if (start < 0) {
      start = 0;
    }
    if (end > this.lines.length) {
      end = this.lines.length;
    }

    // Process each line
    for (let i = start; i < end; i += 1) {
      const line = this.lines[i];
      line.process(this.lines[i - 1]?.lastNodeClassName);
    }

    // Apply the prevClassName to further lines
    let prevClassName = this.lines[end - 1]?.lastNodeClassName;
    if (prevClassName !== undefined) {
      for (let i = end; i < this.lines.length; i += 1) {
        const line = this.lines[i];
        if (!line.processed || line.nodes[0]?.props.className !== undefined) {
          break;
        }
        line.process(prevClassName);
        prevClassName = line.lastNodeClassName;
      }
    }
  }

  public static from(content: string, preprocess = false): LogProcessor {
    const processor = new LogProcessor();
    processor.append(content);
    if (preprocess) {
      processor.process();
    }
    return processor;
  }
}
