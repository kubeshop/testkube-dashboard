import {SearchResult} from '@store/logOutput';

import {createSearchScannerFn} from './createSearchScannerFn';

export interface SearchScannerOptions {
  searchQuery: string;
  onData: (batch: SearchResult[]) => void;
  onEnd: () => void;
}

export interface SearchScanner {
  append(content: string): void;
  stop(): void;
}

const createSearchScannerWorker = (options: SearchScannerOptions): SearchScanner => {
  const blob = new Blob([
    `var scan = (${createSearchScannerFn.toString()})(
       ${JSON.stringify(options.searchQuery)},
       postMessage
     );
     onmessage = function (e) { scan(e.data) }`,
  ]);
  const worker = new Worker(URL.createObjectURL(blob));
  worker.onmessage = e => {
    if (e.data.finished) {
      options.onEnd();
    } else {
      options.onData(e.data as SearchResult[]);
    }
  };
  worker.onerror = err => {
    // eslint-disable-next-line no-console
    console.error('Error from SearchScanner worker', err);
  };
  return {
    append: (content: string) => worker.postMessage(content),
    stop: () => worker.terminate(),
  };
};

const createSearchScannerBlocking = (options: SearchScannerOptions): SearchScanner => {
  const scanner = createSearchScannerFn(options.searchQuery, data => {
    if ((data as any).end) {
      options.onEnd();
    } else {
      options.onData(data as SearchResult[]);
    }
  });
  const timeouts: any[] = [];
  return {
    append: (content: string) => timeouts.push(setTimeout(() => scanner(content), 1)),
    stop: () => timeouts.forEach(x => clearTimeout(x)),
  };
};

export const createSearchScanner = (options: SearchScannerOptions): SearchScanner => {
  if (typeof Worker === 'function' && typeof Blob === 'function') {
    return createSearchScannerWorker(options);
  }
  return createSearchScannerBlocking(options);
};
