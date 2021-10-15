import React, {useContext, useState} from 'react';
import {useQuery, useInfiniteQuery} from 'react-query';

import {config} from '@constants/config';
import {TestsContext} from '@context/testsContext';
import {getAllTests} from '@services/Tests';

export const useFetchTest = () => {
  const [api, setApi] = useState<string>(localStorage.getItem(config.apiEndpoint) || '');
  const tests: any = useContext(TestsContext);
  const {data, error, isLoading} = useQuery(['test', tests.selectedTest.id], () => {
    if (api && tests.selectedTest.id) {
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

export const useFetchTestsWithPagination = (startDate: string) => {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    isSuccess,
  } = useInfiniteQuery(
    ['projects', localStorage.getItem(config.apiEndpoint)],
    async ({pageParam = 1}) => {
      const url = localStorage.getItem(config.apiEndpoint);
      if (startDate) {
        return fetch(`${url}?startDate=${startDate}`).then(res => res.json());
      }
      if (url) {
        // eslint-disable-next-line
        return getAllTests(`${url}?page=` + pageParam);
      }
    },
    {
      getPreviousPageParam: firstPage => firstPage.previousId ?? false,
      getNextPageParam: lastPage => lastPage.nextId ?? false,
      refetchInterval: 5000,
    }
  );

  return {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isLoading,
    hasPreviousPage,
    isSuccess,
  };
};
