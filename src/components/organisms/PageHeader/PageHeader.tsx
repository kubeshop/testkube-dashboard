import React from 'react';
import styled from 'styled-components';

import {DocLinks, PageTitle} from '@molecules';

const StyledPAgeHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-light-primary);
`;

const PageHeader = () => {
  return (
    <StyledPAgeHeader>
      <PageTitle />
      <DocLinks />
    </StyledPAgeHeader>
  );
};

export default PageHeader;
