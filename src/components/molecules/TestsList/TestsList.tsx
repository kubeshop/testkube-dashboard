import React from 'react';

// import moment from 'moment';
// import { nanoid } from 'nanoid';

// import { RenderTestStatusSvgIcon, Typography, TestTypeIcon, Spinner } from '@atoms';
// import { timeStampToDate, getDuration } from '@utils/formatDate';
// import { Result } from '@types';

import { useAppSelector } from '@src/app/hooks';
import Tests from '@src/features/testsList/Tests';
import TestsByStatus from '@src/features/testsList/TestsByStatus';
import TestsByDate from '@src/features/testsList/TestsByDate';
import { selectFilters } from '../../../features/testsList/testsListSlice';



const TestsList = () => {
  const filters = useAppSelector(selectFilters);

  return (
    <>
      {(filters.status === undefined && !filters.date) && <Tests />}
      {(filters.status) && <TestsByStatus />}
      {(filters.date) && <TestsByDate />}
    </>
  );
};

export default TestsList;
