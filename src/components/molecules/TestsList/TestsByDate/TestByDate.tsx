 import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Spinner, Typography } from '@src/components/atoms';
import { TestListItem } from '@atoms';
import { useAppSelector } from '@src/app/hooks';
import {
  nextPage,
  selectFilters,
  selectHasNext,
  selectTestsByDate,
  updateFiltredDataByDate,
} from '@src/features/testsList/testsListSlice';
import { useGetTestsByDateQuery } from '@src/services/tests';
import { nanoid } from '@reduxjs/toolkit';
import { useIntersectionObserver } from '@hooks/intersectionObserver';

const StyledTestListContainer = styled.div`
  display: block;
  width: 100%;
  margin-top: 10px;
`;

const TestsByDate = () => {
  const tests = useAppSelector(selectTestsByDate);
  const filters = useAppSelector(selectFilters);
  const hasNext = useAppSelector(selectHasNext);
  const dispatch = useDispatch();
  const fetchNextPageRef = React.useRef(null);

  const { data,isFetching } = useGetTestsByDateQuery(filters, {
    pollingInterval: 5000,
  });



  useEffect(() => {
    const fetchData = () => {
      if (data) {
        const totalPages = Math.trunc(data.filtered.results / filters.pageSize);

        dispatch(
          updateFiltredDataByDate({
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
          No tests were found in {filters.date}
        </Typography>
      )}
      <div ref={fetchNextPageRef}>{isFetching ? <Spinner size="large" /> : null}</div>
    </StyledTestListContainer>

  );
};

export default TestsByDate;
