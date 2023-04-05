import {useLatest} from 'react-use';
import {useMemo} from 'react';

export const useLatestCallback = <T extends (...args: any) => any = (...args: any) => void>(fn?: T): T => {
  const ref = useLatest(fn);
  return useMemo<T>(() => ((...args: any) => ref.current?.(...args)) as any, []);
};
