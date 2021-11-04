import InfiniteScroll from 'react-infinite-scroll-component';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {nanoid} from '@reduxjs/toolkit';
import styled from 'styled-components';

import {useAppSelector} from '@src/app/hooks';
import {useGetTestsQuery} from '@src/services/tests';
import {Spinner, Typography} from '@src/components/atoms';
import {TestListItem, TestListHeader} from '@atoms';
import {
  selectFilters,
  selectHasNext,
  selectTests,
  updateData,
  updateFilter,
} from '@src/features/testsList/testsListSlice';

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

  const {data} = useGetTestsQuery(filters, {
    pollingInterval: 5000,
  });

  useEffect(() => {
    const fetchData = () => {
      if (data) {
        const totalPages = Math.trunc(data.totals.results / filters?.pageSize);

        dispatch(
          updateData({
            data,
            hasNext: filters.page === 0 ? false : filters.page <= totalPages,
          })
        );
      }
    };
    fetchData();
  }, [data, dispatch]);

  return (
    <InfiniteScroll
      style={{
        overflow: 'hidden',
      }}
      dataLength={allTests?.length}
      next={() => dispatch(updateFilter({page: filters?.page + 1}))}
      hasMore={hasNext ?? false}
      loader={<Spinner />}
    >
      <StyledTestListContainer>
        <TestListHeader />
        {allTests ? (
          allTests?.map((item: any, index: number) => <TestListItem key={nanoid()} index={index} item={item} />)
        ) : (
          <Typography variant="secondary" color="secondary" font="bold">
            No tests were found in {filters.date}
          </Typography>
        )}
      </StyledTestListContainer>
    </InfiniteScroll>
  );
};

export default AllTests;
