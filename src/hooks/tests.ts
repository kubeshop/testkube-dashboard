import React, { useContext, useState } from 'react';
import { useQuery, useInfiniteQuery } from 'react-query';

import { config } from '@constants/config';
import { TestsContext } from '@context/testsContext';
import { getAllTests } from '@services/Tests';
import moment from 'moment';

export const useFetchTest = () => {
  const [api, setApi] = useState<string>(localStorage.getItem(config.apiEndpoint) || '');
  const tests: any = useContext(TestsContext);
  const { data, error, isLoading } = useQuery(['test', tests.selectedTest.id], () => {

    if (api && tests.selectedTest.id) {
      return fetch(`${api}/${tests.selectedTest.id}`).then(res => res.json());
    }
  }, {
    notifyOnChangeProps: ['data', 'isLoading'],
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
  const [paginatedResults, setPaginatedResults] = useState<any>({ totals: [], results: [] });

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
    ['tests', localStorage.getItem(config.apiEndpoint)],
    async ({ pageParam = currentPage }) => {

      setCurrentPage(pageParam);

      const url = localStorage.getItem(config.apiEndpoint);

      if (startDate) {
        const formatedDate = moment(startDate).format('YYYY-MM-DD');
        fetch(`${url}?page=${pageParam}&startDate=${formatedDate}&endDate=${formatedDate}`).then(res => res.json());
      }

      if (url) {
        // eslint-disable-next-line
        return getAllTests(`${url}?page=${pageParam}`);
      }

    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {

        let totalPages = Math.trunc(lastPage?.totals?.results / 100); // total pages

        if ((lastPage?.totals?.results % 100) > 0) {

          totalPages + 1;
        }

        return (currentPage < totalPages) ? currentPage + 1 : undefined;
      },
      getPreviousPageParam: (firstPage) => {
        let totalPages = Math.trunc(firstPage?.totals?.results / 100); // total pages

        if ((firstPage?.totals?.results % 100) > 0) {
          totalPages + 1;
        }

        return (currentPage < 0) ? currentPage - 1 : undefined;
      },
      refetchInterval: 5000,
      notifyOnChangeProps: ['data', 'isLoading'],
    }
  );
  React.useEffect(() => {
    if (data && data?.pages[currentPage]?.results) {

      setPaginatedResults({
        totals: data?.pages[currentPage]?.totals,
        results: [...paginatedResults?.results, ...data?.pages[currentPage]?.results],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, data]);

  return {
    status,
    data: paginatedResults,
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
