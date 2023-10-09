import {useContext} from 'react';
import {NavigateOptions, To} from 'react-router';

import {DashboardContext} from '@contexts';

import {useLastCallback} from './useLastCallback';

export function useDashboardNavigate<T extends (...args: any) => To | number>(
  to: T,
  options?: NavigateOptions
): (...args: Parameters<T>) => void;
export function useDashboardNavigate(to: To | number, options?: NavigateOptions): () => void;
export function useDashboardNavigate(
  to: To | ((...args: any) => To | number) | number,
  options?: NavigateOptions
): (...args: any) => void {
  const {navigate} = useContext(DashboardContext);
  const build = typeof to === 'function' ? to : () => to;
  return useLastCallback((...args) => navigate(build(...args) as any, options));
}
