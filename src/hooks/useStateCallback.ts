import {useCallback, useEffect, useRef, useState} from 'react';

const useStateCallback = <T>(initialState: T): [T, (state: T, cb?: (state: T) => void) => void] => {
  const [actualState, setState] = useState(initialState);
  const cbRef = useRef<((state: T) => void) | undefined>(undefined);

  const setStateCallback = useCallback((state: T, cb?: (state: T) => void) => {
    cbRef.current = cb;

    setState(state);
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(actualState);
      cbRef.current = undefined;
    }
  }, [actualState]);

  return [actualState, setStateCallback];
};

export default useStateCallback;
