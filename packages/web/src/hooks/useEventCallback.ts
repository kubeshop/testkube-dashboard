import {useEvent} from 'react-use';
import {ListenerType1, ListenerType2, UseEventOptions, UseEventTarget} from 'react-use/lib/useEvent';

import {useLastCallback} from '@hooks/useLastCallback';

type AddEventListener<T> = T extends ListenerType1 ? T['addEventListener'] : T extends ListenerType2 ? T['on'] : never;

// useEvent from react-use, but without reattaching the changed handler
export const useEventCallback = <T extends UseEventTarget>(
  name: Parameters<AddEventListener<T>>[0],
  handler?: Parameters<AddEventListener<T>>[1] | null | undefined,
  target?: Window | T | null,
  options?: UseEventOptions<T> | undefined
): void => useEvent(name, useLastCallback(handler), target, options);
