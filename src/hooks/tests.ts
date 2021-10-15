import React, { useContext, useState } from 'react';
import { useQuery, useInfiniteQuery } from 'react-query';

import { config } from '@constants/config';
import { TestsContext } from '@context/testsContext';
import { getAllTests } from '@services/Tests';

export const useFetchTest = () => {
  const [api, setApi] = useState<string>(localStorage.getItem(config.apiEndpoint) || '');
  const tests: any = useContext(TestsContext);
  const { data, error, isLoading } = useQuery(['test', tests.selectedTest.id], () => {
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

  return { data, error, isLoading };
};

export const useFetchTestsWithPagination = (startDate: string | null) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

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
  } = useInfiniteQuery(
    ['tests', localStorage.getItem(config.apiEndpoint)],
    async ({ pageParam = currentPage }) => {
      setCurrentPage(pageParam);
      const url = localStorage.getItem(config.apiEndpoint);
      if (startDate) {
        return fetch(`${url}?page=${pageParam}&startDate=${startDate}&endDate=${startDate}`).then(res => res.json());
      }

      if (url) {
        // eslint-disable-next-line
        return getAllTests(`${url}?page=${pageParam}`);
      }
    },
    {
      getNextPageParam: (lastPage) => (lastPage?.results?.length > 0) ? currentPage + 1 : undefined,
      getPreviousPageParam: (firstPage) => (firstPage?.results?.length > 0) ? currentPage + 1 : undefined,
      refetchInterval: 5000,
    }
  );
    
  return {
    status,
    data : data?.pages[0],
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isLoading,
    hasPreviousPage
  };
};
