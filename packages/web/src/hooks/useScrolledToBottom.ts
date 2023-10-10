import {useMemo} from 'react';

export const useScrolledToBottom = (element?: Element | null, offset = 25, defaults = true) =>
  useMemo(
    () => (element ? Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < offset : defaults),
    [element?.clientHeight, element?.scrollHeight, element?.scrollTop, offset, defaults]
  );
