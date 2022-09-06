import {useEffect} from 'react';

import {useAppSelector} from '@redux/hooks';
import {selectApiEndpoint} from '@redux/reducers/configSlice';

const useWebSocket = (args: any) => {
  const {endpoint, cb} = args;

  const apiEndpoint = useAppSelector(selectApiEndpoint);

  useEffect(() => {
    if (apiEndpoint) {
      const wsRoot = apiEndpoint.replace(/https?/, 'ws');

      const ws = new WebSocket(`${wsRoot}${endpoint}`);

      ws.onmessage = cb;

      return () => {
        ws.close();
      };
    }
  }, [cb, endpoint, apiEndpoint]);
};

export default useWebSocket;
