import React from 'react';

import {useAppSelector} from '@redux/hooks';
import {TestsByStatus, TestsByDate, AllTests} from '@molecules';

import { useGetTestsQuery } from '@src/services/tests';
import {selectFilters} from '../../../redux/reducers/testsListSlice';

const TestsList = () => {
  const filters = useAppSelector(selectFilters);
  const testsQuery = useGetTestsQuery(filters, {
    pollingInterval: 5000,

  });

  const results = testsQuery.status === "fulfilled" ? testsQuery : null;
  // const { data } = results;
   return (
    <>
      {filters.status === undefined && !filters.date && <AllTests />}
      {filters.status && <TestsByStatus />}
      {filters.date && <TestsByDate />}
    </>
  );
};

export default TestsList;
