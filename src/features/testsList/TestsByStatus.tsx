import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Spinner, Typography } from '@src/components/atoms';
import styled from 'styled-components';
import Test from './Test';

import { useGetTestsByStatusQuery } from '../../services/tests';
import {
  selectTestsByStatus,
  selectFilters,
  selectHasNext,
  updateFiltredDataByStatus,
  nextPage,
} from './testsListSlice';
import { useAppSelector } from '../../app/hooks';
import { getStatus } from '../../app/utils';

const StyledTestListContainer = styled.div`
  display: block;
  width: 100%;
  margin-top: 10px;
`;
const StyledTestListStickyRow = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--color-dark-primary);
  transition: 0.5s;
  height: 50px;
`;

const StyledTestListCell = styled.div`
  white-space: nowrap;

  &:nth-child(1) {
    width: calc(100% - 440px);
    padding-left: 20px;
  }

  &:nth-child(2) {
    width: 200px;
  }

  &:nth-child(3) {
    width: 100px;
  }

  &:nth-child(4) {
    width: 60px;
  }

  &:nth-child(5) {
    width: 60px;
    margin-right: 20px;
  }
`;
const TestsByStatus = () => {
  const tests = useAppSelector(selectTestsByStatus);
  const filters = useAppSelector(selectFilters);
  const hasNext = useAppSelector(selectHasNext);
  const dispatch = useDispatch();

  const { data } = useGetTestsByStatusQuery(filters, {
    pollingInterval: 5000,
  });

  useEffect(() => {
    const fetchData = () => {
      if (data) {
        const totalPages = Math.trunc(data.filtered[getStatus(filters.status)] / filters.pageSize);

        dispatch(
          updateFiltredDataByStatus({
            data,
            hasNext: filters.page < totalPages,
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
      next={() => dispatch(nextPage())}
      hasMore={hasNext ?? false}
      loader={<Spinner />}
    >
      <StyledTestListContainer>
        <StyledTestListStickyRow>
          <StyledTestListCell>
            <Typography variant="secondary" color="secondary" font="bold" leftAlign>
              Name
            </Typography>
          </StyledTestListCell>

          <StyledTestListCell>
            <Typography variant="secondary" color="secondary" font="bold" leftAlign>
              Started At
            </Typography>
          </StyledTestListCell>

          <StyledTestListCell>
            <Typography variant="secondary" color="secondary" font="bold">
              Duration
            </Typography>
          </StyledTestListCell>

          <StyledTestListCell>
            <Typography variant="secondary" color="secondary" font="bold">
              Status
            </Typography>
          </StyledTestListCell>

          <StyledTestListCell>
            <Typography variant="secondary" color="secondary" font="bold">
              Type
            </Typography>
          </StyledTestListCell>
        </StyledTestListStickyRow>
        {tests?.length > 0 ? (
          tests?.map((item: any, index: number) => <Test key={nanoid()} index={index} item={item} />)
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
