import React from 'react';

import {useAppSelector} from '@src/app/hooks';
import Tests from '@src/features/testsList/Tests';
import TestsByStatus from '@src/features/testsList/TestsByStatus';
import TestsByDate from '@src/features/testsList/TestsByDate';
import {selectFilters} from '../../../features/testsList/testsListSlice';

const TestsList = () => {
  const filters = useAppSelector(selectFilters);

  return (
    <>
      {filters.status === undefined && !filters.date && <Tests />}
      {filters.status && <TestsByStatus />}
      {filters.date && <TestsByDate />}
    </>
  );
};

export default TestsList;
