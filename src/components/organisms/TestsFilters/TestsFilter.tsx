import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import React from 'react';

import {clearFiltredData, selectFilters} from '@src/features/testsList/testsListSlice';
import {useAppSelector} from '@src/app/hooks';
import {Typography, Button} from '@atoms';

const StyledTestTextDescription = styled.td`
  border: none;
`;

const StyleTestFilterButtons = styled.td`
  display: flex;
  align-items: baseline;
  justify-content: center;
  border: none;
  margin-right: -10px;
`;

const TestsFilter = () => {
  const filters = useAppSelector(selectFilters);

  const dispatch = useDispatch();

  const handleClick = (status: string | undefined) => {
    dispatch(clearFiltredData({page: 0, status}));
  };
  return (
    <>
      <StyledTestTextDescription>
        <Typography variant="secondary" color="secondary" font="light" data-testid="Test filters">
          Tests
        </Typography>
      </StyledTestTextDescription>
      <StyleTestFilterButtons>
        <Typography variant="secondary">Show: </Typography>
        <Button
          active={filters.status === undefined}
          disabled={filters.status === undefined && !filters.date}
          onClick={() => handleClick(undefined)}
        >
          All
        </Button>
        <Button
          active={filters.status === 'pending'}
          disabled={filters.status === 'pending'}
          onClick={() => handleClick('pending')}
        >
          Running
        </Button>
        <Button
          active={filters.status === 'success'}
          disabled={filters.status === 'success'}
          onClick={() => handleClick('success')}
        >
          Passed
        </Button>
        <Button
          active={filters.status === 'error'}
          disabled={filters.status === 'error'}
          onClick={() => handleClick('error')}
        >
          Failed
        </Button>
      </StyleTestFilterButtons>
    </>
  );
};

export default TestsFilter;
