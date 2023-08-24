import {KeyboardEvent} from 'react';

type Callback = () => any;

const onEvent = (e: KeyboardEvent<any>, cb: Callback) => {
  if (e.code === 'Enter') {
    cb();
  }
};

export const usePressEnter = () => onEvent;
