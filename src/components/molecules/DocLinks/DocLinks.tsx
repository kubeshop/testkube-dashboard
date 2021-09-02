import React from 'react';
import styled from 'styled-components';

import {Typography} from '@atoms';

const StyledDocHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-right: var(--space-lg);
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const DocLinks = () => {
  return (
    <StyledDocHead>
      <StyledLink href="https://github.com/kubeshop/kubtest" target="_blank">
        <Typography variant="secondary" color="quinary">
          Github
        </Typography>
      </StyledLink>
      <StyledLink href="https://kubeshop.github.io/kubtest/" target="_blank">
        <Typography variant="secondary" color="quinary">
          Docs
        </Typography>
      </StyledLink>
    </StyledDocHead>
  );
};

export default DocLinks;
