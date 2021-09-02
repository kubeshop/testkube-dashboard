import React from 'react';
import styled from 'styled-components';

import {Typography} from '@atoms';

const StyledMainTitle = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-left: var(--space-lg);
`;

const StyledHeadTitle = styled.p`
  font-size: var(--font-size-xl);
  text-transform: uppercase;
  color: var(--color-light-primary);
`;

const PageTitle = () => {
  return (
    <StyledMainTitle>
      <StyledHeadTitle>KubeTest</StyledHeadTitle>
      <Typography variant="quaternary" color="secondary">
        Dashboard
      </Typography>
    </StyledMainTitle>
  );
};

export default PageTitle;
