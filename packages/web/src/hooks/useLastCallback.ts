import {useCallback} from 'react';
import {useLatest} from 'react-use';

type Fn = (...args: any) => any;

/**
 * Keep the same identity of a callback function,
 * but calling the latest one anyway.
 */
export const useLastCallback = <T extends Fn>(fn: T): T => {
  const ref = useLatest(fn);
  return useCallback(((...args) => ref.current(...args)) as T, []);
};
