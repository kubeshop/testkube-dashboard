import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
 
import { Spinner, Typography } from '@src/components/atoms';
import styled from 'styled-components';
import { TestListItem } from '@atoms';

import { useGetTestsByStatusQuery } from '@services/tests';

import {
  nextPage,
  selectFilters,
  selectHasNext,
  selectTestsByStatus,
  updateFiltredDataByStatus,
} from '@src/features/testsList/testsListSlice';
import { useAppSelector } from '@src/app/hooks';
import { getStatus } from '@src/app/utils';
import { nanoid } from '@reduxjs/toolkit';
import { useIntersectionObserver } from '@hooks/intersectionObserver';

const StyledTestListContainer = styled.div`
  display: block;
  width: 100%;
  margin-top: 10px;
`;

const TestsByStatus = () => {
  const tests = useAppSelector(selectTestsByStatus);
  const filters = useAppSelector(selectFilters);
  const hasNext = useAppSelector(selectHasNext);
  const dispatch = useDispatch();
  const fetchNextPageRef = React.useRef(null);
  const { data, isFetching } = useGetTestsByStatusQuery(filters, {
    pollingInterval: 5000,
  });

  useEffect(() => {
    const fetchData = () => {
      if (data) {
        const totalPages = Math.trunc(data.filtered[getStatus(filters.status)] / filters.pageSize);

        dispatch(
          updateFiltredDataByStatus({
            data,
            hasNext: filters.page <= totalPages
          })
        );
      }
    };
    fetchData();
  }, [data, dispatch]);

  useIntersectionObserver({
    target: fetchNextPageRef,
    onIntersect: () => dispatch(nextPage()),
    enabled: hasNext,
  });
  return (
    <StyledTestListContainer>

      {tests ? (
        tests?.map((item: any, index: number) => <TestListItem key={nanoid()} index={index} item={item} />)
      ) : (
        <Typography variant="secondary" color="secondary" font="bold">
          No {filters.status} tests were found
        </Typography>
      )}
      <div ref={fetchNextPageRef}>{isFetching ? <Spinner size="large" /> : null}</div>
    </StyledTestListContainer>

  );
};

export default TestsByStatus;
