import {KeyboardEvent} from 'react';

type Callback = () => any;

const usePressEnter = () => {
  const onEvent = (e: KeyboardEvent<any>, cb: Callback) => {
    if (e.code === 'Enter') {
      cb();
    }
  };

  return onEvent;
};

export default usePressEnter;
