import React from 'react';
import styled from 'styled-components';

import {Image, Typography} from '@atoms';
import MainLogo from '@assets/mainLogo.svg';

const StyledMainTitle = styled.div`
  display: flex;
  gap: var(--space-md);
  margin-left: var(--space-lg);
`;

const PageTitle = () => {
  return (
    <StyledMainTitle>
      <Image src={MainLogo} type="svg" alt="Logo" width={200} height={100} />
      <>
        <Typography variant="tertiary" color="tertiary" style={{position: 'relative', top: '40px'}}>
          Dashboard
        </Typography>
      </>
    </StyledMainTitle>
  );
};

export default PageTitle;
