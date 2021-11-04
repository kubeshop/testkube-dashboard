import InfiniteScroll from 'react-infinite-scroll-component';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {nanoid} from 'nanoid';

import {Spinner, Typography} from '@src/components/atoms';
import {TestListItem, TestListHeader} from '@atoms';
import {useAppSelector} from '@src/app/hooks';
import {
  selectFilters,
  selectHasNext,
  selectTestsByDate,
  updateFilter,
  updateFiltredDataByDate,
} from '@src/features/testsList/testsListSlice';
import {useGetTestsByDateQuery} from '@src/services/tests';

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

  const {data} = useGetTestsByDateQuery(filters, {
    pollingInterval: 5000,
  });

  useEffect(() => {
    const fetchData = () => {
      if (data) {
        const totalPages = Math.trunc(data.filtered.results / filters.pageSize);

        dispatch(
          updateFiltredDataByDate({
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
      dataLength={tests?.length}
      next={() => dispatch(updateFilter({page: filters?.page + 1}))}
      hasMore={hasNext ?? false}
      loader={<Spinner />}
    >
      <StyledTestListContainer>
        <TestListHeader />
        {tests?.length > 0 ? (
          tests?.map((item: any, index: number) => <TestListItem key={nanoid()} index={index} item={item} />)
        ) : (
          <Typography variant="secondary" color="secondary" font="bold">
            No tests were found in {filters.date}
          </Typography>
        )}
      </StyledTestListContainer>
    </InfiniteScroll>
  );
};

export default TestsByDate;
