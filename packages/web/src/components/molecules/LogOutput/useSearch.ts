import {useEffect, useMemo, useRef, useState} from 'react';

import {useRafUpdate} from '@hooks/useRafUpdate';

import {SearchResult} from '@store/logOutput';

import {createSearchScanner} from './createSearchScanner';

export interface SearchOptions {
  searchQuery: string;
  output?: string;
}

export const useSearch = ({searchQuery, output}: SearchOptions) => {
  const rerender = useRafUpdate();
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef<SearchResult[]>([]);
  const mapRef = useRef<Record<number, SearchResult[]>>({});
  const linesRef = useRef<number[]>([]);

  useMemo(() => {
    resultsRef.current = [];
    mapRef.current = {};
    linesRef.current = [];
  }, [output, searchQuery]);

  // TODO: Append output for live data
  useEffect(() => {
    resultsRef.current = [];
    mapRef.current = {};
    linesRef.current = [];
    if (!searchQuery) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const scanner = createSearchScanner({
      searchQuery,
      onData: batch => {
        resultsRef.current.push(...batch);
        rerender();

        batch.forEach(result => {
          if (mapRef.current[result.line]) {
            mapRef.current[result.line] = [...mapRef.current[result.line], result];
          } else {
            linesRef.current.push(result.line);
            mapRef.current[result.line] = [result];
          }
        });
      },
      onEnd: () => setLoading(false),
    });

    scanner.append(output || '');

    return () => scanner.stop();
  }, [output, searchQuery]);

  return {
    list: resultsRef.current,
    map: mapRef.current,
    lines: linesRef.current,
    loading,
  };
};
