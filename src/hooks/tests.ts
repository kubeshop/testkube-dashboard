import React, {useContext, useState} from 'react';
import {useQuery} from 'react-query';

import {config} from '@constants/config';
import {TestsContext} from '@context/testsContext';
import {getAllTests} from '@services/Tests';

export const useFetchTest = () => {
  const [api, setApi] = useState<string>(localStorage.getItem(config.apiEndpoint) || '');
  const tests: any = useContext(TestsContext);
  const {data, error, isLoading} = useQuery(
    ['test', tests.selectedTest.id],
    () => {
      if (api) {
        return fetch(`${api}/${tests.selectedTest.id}`).then(res => res.json());
      }
    },
    {
      notifyOnChangeProps: ['data', 'isLoading'],
    }
  );

  React.useEffect(() => {
    const apiFromUser = localStorage.getItem(config.apiEndpoint);
    if (apiFromUser) {
      setApi(apiFromUser);
    }
  }, [tests.selectedTest]);

  return {data, error, isLoading};
};

export const useFetchTests = () => {
  const {data, error, isLoading} = useQuery(
    ['tests', localStorage.getItem(config.apiEndpoint)],
    () => {
      const url = localStorage.getItem(config.apiEndpoint);
      if (url) {
        return getAllTests(url);
      }
    },
    {
      refetchInterval: 5000,
      notifyOnChangeProps: ['data', 'isLoading'],
    }
  );

  return {data, error, isLoading};
};
