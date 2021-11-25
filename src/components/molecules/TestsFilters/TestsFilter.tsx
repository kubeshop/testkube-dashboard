import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import React from 'react';

import {clearFiltredData, selectFilters} from '@redux/reducers/testsListSlice';
import {useAppSelector} from '@redux/hooks';
import {Typography, Button} from '@atoms';

const StyleTestFilterButtons = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  &:last-child {
    margin-right: 0px;
  }
`;

const TestsFilter = () => {
  const filters = useAppSelector(selectFilters);

  const dispatch = useDispatch();

  const handleClick = (status: string | undefined) => {
    dispatch(clearFiltredData({page: 0, status}));
  };
  return (
    <StyleTestFilterButtons>
      <Typography variant="secondary">Show: </Typography>
      <Button
        active={filters.status === undefined}
        disabled={filters.status === undefined && !filters.date}
        onClick={() => handleClick(undefined)}
        variant="primary"
      >
        All
      </Button>
      <Button
        active={filters.status === 'pending'}
        disabled={filters.status === 'pending'}
        onClick={() => handleClick('pending')}
        variant="primary"
      >
        Running
      </Button>
      <Button
        active={filters.status === 'queued'}
        disabled={filters.status === 'queued'}
        onClick={() => handleClick('queued')}
        variant="primary"
      >
        Waiting
      </Button>
      <Button
        active={filters.status === 'success'}
        disabled={filters.status === 'success'}
        onClick={() => handleClick('success')}
        variant="primary"
      >
        Passed
      </Button>
      <Button
        active={filters.status === 'error'}
        disabled={filters.status === 'error'}
        onClick={() => handleClick('error')}
        variant="primary"
      >
        Failed
      </Button>
    </StyleTestFilterButtons>
  );
};

export default TestsFilter;
