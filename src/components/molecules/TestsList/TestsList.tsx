import React from 'react';

import {useAppSelector} from '@redux/hooks';
import {TestsByStatus, TestsByDate, AllTests} from '@molecules';
import {TestListHeader} from '@atoms';
import {selectFilters} from '../../../redux/reducers/testsListSlice';

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
