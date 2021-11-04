import React from 'react';

import {useAppSelector} from '@src/app/hooks';
import {TestsByStatus, TestsByDate, AllTests} from '@molecules';
import {selectFilters} from '../../../features/testsList/testsListSlice';

const TestsList = () => {
  const filters = useAppSelector(selectFilters);

  return (
    <>
      {filters.status === undefined && !filters.date && <AllTests />}
      {filters.status && <TestsByStatus />}
      {filters.date && <TestsByDate />}
    </>
  );
};

export default TestsList;
