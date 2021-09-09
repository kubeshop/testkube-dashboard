import React from 'react';
import styled from 'styled-components';

import {Typography, Image} from '@atoms';
import MainLogo from '@assets/mainLogo.svg';

const StyledMainTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: var(--space-md);
  margin-left: var(--space-lg);
`;

const PageTitle = () => {
  return (
    <StyledMainTitle>
      <Image src={MainLogo} alt="Logo" type="svg" width={200} height={100} />
      <Typography variant="quaternary" color="secondary">
        Dashboard
      </Typography>
    </StyledMainTitle>
  );
};

export default PageTitle;
