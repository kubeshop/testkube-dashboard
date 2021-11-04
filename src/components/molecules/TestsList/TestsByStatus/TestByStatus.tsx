import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {nanoid} from 'nanoid';
import InfiniteScroll from 'react-infinite-scroll-component';

import {Spinner, Typography} from '@src/components/atoms';
import styled from 'styled-components';
import {TestListItem, TestListHeader} from '@atoms';

import {useGetTestsByStatusQuery} from '@services/tests';

import {
  selectFilters,
  selectHasNext,
  selectTestsByStatus,
  updateFilter,
  updateFiltredDataByStatus,
} from '@src/features/testsList/testsListSlice';
import {useAppSelector} from '@src/app/hooks';
import {getStatus} from '@src/app/utils';

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

  const {data} = useGetTestsByStatusQuery(filters, {
    pollingInterval: 5000,
  });

  useEffect(() => {
    const fetchData = () => {
      if (data) {
        const totalPages = Math.trunc(data.filtered[getStatus(filters.status)] / filters.pageSize);

        dispatch(
          updateFiltredDataByStatus({
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
            No {filters.status} tests were found
          </Typography>
        )}
      </StyledTestListContainer>
    </InfiniteScroll>
  );
};

export default TestsByStatus;
