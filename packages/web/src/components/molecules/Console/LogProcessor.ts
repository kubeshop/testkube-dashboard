import {LogProcessorLine} from './LogProcessorLine';
import {ANSI_MARKER} from './utils';

export class LogProcessor {
  private activeLine: LogProcessorLine | undefined = undefined;
  public lines: LogProcessorLine[] = [];
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
