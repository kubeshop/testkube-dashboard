import React, {useContext, useState} from 'react';
import {useQuery} from 'react-query';

import {config} from '@constants/config';
import {TestsContext} from '@context/testsContext';

export const useFetchTest = () => {
  const [api, setApi] = useState<string>(localStorage.getItem(config.apiEndpoint) || '');
  const tests: any = useContext(TestsContext);
  const {data, error, isLoading} = useQuery(['test', tests.selectedTest.id], () => {
    if (api) {
      return fetch(`${api}/${tests.selectedTest.id}`).then(res => res.json());
    }
  });

  React.useEffect(() => {
    const apiFromUser = localStorage.getItem(config.apiEndpoint);
    if (apiFromUser) {
      setApi(apiFromUser);
    }
  }, []);

  return {data, error, isLoading};
};

export const useFetchTests = () => {
  const {data, error, isLoading} = useQuery(
    'tests',
    () => {
      const url = localStorage.getItem(config.apiEndpoint);
      if (url) {
        return fetch(url).then(res => res.json());
      }
    },
    {refetchInterval: 5000}
  );

  return {data, error, isLoading};
};
