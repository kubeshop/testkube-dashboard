import {useState} from 'react';
import {useInterval} from 'react-use';

import {isEqual} from 'lodash';

type ClientRect = Pick<DOMRect, 'top' | 'left' | 'width' | 'height'>;

const getClientRect = (rect?: DOMRect): ClientRect | undefined =>
  rect ? {top: rect.top, left: rect.left, width: rect.width, height: rect.height} : undefined;

export const useClientRect = (element?: HTMLElement | null, interval = 100) => {
  const [clientRect, setClientRect] = useState(() => getClientRect(element?.getBoundingClientRect()));

  useInterval(() => {
    const newClientRect = getClientRect(element?.getBoundingClientRect());
    if (newClientRect && !isEqual(newClientRect, clientRect)) {
      setClientRect(newClientRect);
    }
  }, interval);

  return clientRect;
};
