import React from 'react';
import styled from 'styled-components';

import {Image} from '@atoms';

import docsIcon from '@assets/docs.svg';
import githubIcon from '@assets/githubIcon.svg';

const StyledDocHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-right: var(--space-lg);
`;

const DocLinks = () => {
  return (
    <StyledDocHead>
      <a href="https://kubeshop.github.io/kubtest/" target="_blank" rel="noopener">
        <Image src={docsIcon} alt="Docs" type="svg" width={30} height={30} />
      </a>
      <a href="https://github.com/kubeshop/kubtest" target="_blank" rel="noopener">
        <Image src={githubIcon} alt="Docs" type="svg" width={30} height={30} />
      </a>
    </StyledDocHead>
  );
};

export default DocLinks;
