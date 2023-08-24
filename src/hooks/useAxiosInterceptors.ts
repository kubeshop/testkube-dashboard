import {useEffect} from 'react';

import axios from 'axios';

import {displayDefaultErrorNotification} from '@utils/notification';

export const useAxiosInterceptors = () => {
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      res => {
        return res;
      },
      error => {
        displayDefaultErrorNotification({
          title: error?.response?.data?.title || error?.code,
          detail: error?.response?.data?.detail || error?.message,
        });

        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);
};
