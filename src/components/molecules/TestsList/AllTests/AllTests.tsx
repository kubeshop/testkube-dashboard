import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {nanoid} from '@reduxjs/toolkit';
import styled from 'styled-components';

import {useAppSelector} from '@redux/hooks';
import {useGetTestsQuery} from '@src/services/tests';
import {Spinner, Typography} from '@src/components/atoms';
import {TestListItem} from '@atoms';
import {useIntersectionObserver} from '@src/hooks/intersectionObserver';

import {nextPage, selectFilters, selectHasNext, selectTests, updateData} from '@redux/reducers/testsListSlice';

const StyledTestListContainer = styled.div`
  display: block;
  width: 100%;
  margin-top: 10px;
`;

const AllTests = () => {
  const allTests = useAppSelector(selectTests);
  const filters = useAppSelector(selectFilters);
  const hasNext = useAppSelector(selectHasNext);

  const dispatch = useDispatch();
  const fetchNextPageRef = React.useRef(null);

  const {data, isFetching} = useGetTestsQuery(filters, {
    pollingInterval: 5000,
  });

  useEffect(() => {
    const fetchData = () => {
      if (data) {
        const totalPages = Math.trunc(data.totals.results / filters?.pageSize);

        dispatch(
          updateData({
            data,
            hasNext: filters.page <= totalPages,
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
      {allTests ? (
        allTests?.map((item: any, index: number) => <TestListItem key={nanoid()} index={index} item={item} />)
      ) : (
        <Typography variant="secondary" color="secondary" font="bold">
          No tests were found in {filters.date}
        </Typography>
      )}
      <div ref={fetchNextPageRef}>{isFetching ? <Spinner size="large" /> : null}</div>
    </StyledTestListContainer>
  );
};

export default AllTests;
