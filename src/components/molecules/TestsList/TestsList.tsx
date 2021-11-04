import React from 'react';

import { useAppSelector } from '@src/app/hooks';
import { TestsByStatus, TestsByDate, AllTests } from '@molecules';
import { TestListHeader } from '@atoms';
import { selectFilters } from '../../../features/testsList/testsListSlice';


const TestsList = () => {
  const filters = useAppSelector(selectFilters);

  return (
    <>
      <TestListHeader />
      {filters.status === undefined && !filters.date && <AllTests />}
      {filters.status && <TestsByStatus />}
      {filters.date && <TestsByDate />}
    </>
  );
};

export default TestsList;
