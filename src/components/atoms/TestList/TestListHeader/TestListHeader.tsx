import React from 'react';
import styled from 'styled-components';
import {Typography} from '@src/components/atoms';

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

const TestListHeader = () => {
  return (
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
  );
};

export default TestListHeader;
