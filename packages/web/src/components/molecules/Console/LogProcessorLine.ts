import {ReactElement, createElement} from 'react';

import Anser, {AnserJsonEntry} from 'anser';

import {ANSI_MARKER, countCharacters} from './utils';

const anser = new Anser();
const anserOptions = {json: true, remove_empty: true, use_classes: true};
function buildClassName(bundle: AnserJsonEntry): string | undefined {
  let className: string = '';
  if (bundle.bg) {
    className += `${bundle.bg}-bg `;
  }
  if (bundle.fg) {
    className += `${bundle.fg}-fg `;
  }
  if (bundle.decoration) {
    className += `ansi-${bundle.decoration} `;
  }
  return className ? className.substring(0, className.length - 1) : undefined;
}

export class LogProcessorLine {
  private source: string;
  public start: number;
  public end: number;
  private noAsciiDecode: boolean;
  public processed = false;
  public chars: number;
  public nodes: ReactElement[] = [];
  public lastNodeClassName: string | undefined = undefined;

  public constructor(source: string, start: number, end: number, noAsciiDecode = false) {
    this.source = source;
    this.start = start;
    this.end = end;
    this.noAsciiDecode = noAsciiDecode;
    this.chars = noAsciiDecode ? end - start : countCharacters(source, start, end);
  }

  public append(content: string, start = 0, end = content.length, noAsciiDecode = false): void {
    this.source = this.source.substring(this.start, this.end) + content.substring(start, end);
    this.start = 0;
    this.end = this.source.length;
    // TODO: Process next chunks only
    this.noAsciiDecode = this.noAsciiDecode && noAsciiDecode;
    if (this.processed) {
      this.processed = false;
      this.nodes = [];
      this.process(this.nodes[0]?.props.className);
    } else {
      this.chars += noAsciiDecode ? end - start : countCharacters(content, start, end);
    }
  }

  // TODO: Optimize for cases where consecutive characters have same color codes
  private addNode(content: string, className?: string): void {
    this.nodes.push(createElement('span', {key: this.nodes.length, className}, content));
    this.lastNodeClassName = className;
  }

  private processNextAsciiChunk(start: number, end: number): void {
    const match = anser.processChunkJson(this.source.substring(start, end), anserOptions, true);
    this.addNode(match.content, buildClassName(match));
  }

  private processNextRawChunk(start: number, end: number): void {
    this.addNode(this.source.substring(start, end), this.lastNodeClassName);
  }

  private processNextChunk(start: number, end: number, ascii = false): void {
    if (start >= end) {
      return;
    }
    if (ascii) {
      this.processNextAsciiChunk(start, end);
    } else {
      this.processNextRawChunk(start, end);
    }
  }

  public process(prevClassName?: string): void {
    // Avoid processing twice
    if (this.processed) {
      return;
    }
    this.processed = true;

    // Preserve the known class name
    this.lastNodeClassName = prevClassName;

    // Fast-track when we know there is no ASCII
    if (this.noAsciiDecode) {
      this.processNextRawChunk(this.start, this.end);
      return;
    }

    // Parse the content for the ASCII codes
    let lastIndex = this.start;
    let isEscaping = false;
    for (let i = this.start; i < this.end; i += 1) {
      if (this.source[i] === ANSI_MARKER && this.source[i + 1] === '[') {
        this.processNextChunk(lastIndex, i, isEscaping);
        isEscaping = true;
        i += 1;
        lastIndex = i + 1;
      }
    }

    // Handle the last chunk
    this.processNextChunk(lastIndex, this.end, isEscaping);
  }
}
