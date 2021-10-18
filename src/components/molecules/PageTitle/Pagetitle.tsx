import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {Image, Typography} from '@atoms';
import MainLogo from '@assets/logo.svg';

const StyledMainTitle = styled.div`
  display: flex;
  gap: var(--space-md);
  margin-left: var(--space-lg);
`;

const PageTitle = () => {
  return (
    <StyledMainTitle>
      <Link to="/">
        <Image src={MainLogo} type="svg" alt="Logo" width={200} height={100} />
      </Link>
      <>
        <Typography variant="tertiary" color="tertiary" font="light" style={{position: 'relative', top: '30px'}}>
          Dashboard
        </Typography>
      </>
    </StyledMainTitle>
  );
};

export default PageTitle;
