import {useRef} from 'react';
import {useUnmount, useUpdate} from 'react-use';

export const useRafUpdate = (maxMs = 100): (() => void) => {
  const rerender = useUpdate();
  const frameRef = useRef<number>(0);
  const maxTimeRef = useRef<number>(Infinity);
  maxTimeRef.current = Infinity;
  cancelAnimationFrame(frameRef.current);

  const update = () => {
    const now = Date.now();
    if (frameRef.current === 0) {
      maxTimeRef.current = now + maxMs;
    }
    if (maxTimeRef.current >= now) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = 0;
        rerender();
      });
    }
  };
  useUnmount(() => {
    cancelAnimationFrame(frameRef.current);
  });
  return update;
};
