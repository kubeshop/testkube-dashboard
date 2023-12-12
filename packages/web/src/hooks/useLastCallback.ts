import {useCallback} from 'react';
import {useLatest} from 'react-use';

type Fn = (...args: any) => any;

const noop = () => {};

/**
 * Keep the same identity of a callback function,
 * but calling the latest one anyway.
 */
export const useLastCallback = <T extends Fn>(fn: T | null | undefined): T => {
  const ref = useLatest(fn || noop);
  return useCallback(((...args) => ref.current(...args)) as T, []);
};
