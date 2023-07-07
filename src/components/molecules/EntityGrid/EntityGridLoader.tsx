import React, {memo} from 'react';

import {LoadingOutlined} from '@ant-design/icons';

import {StyledEntityGridLoaderContainer} from './EntityGrid.styled';

const EntityGridLoader: React.FC = () => (
  <StyledEntityGridLoaderContainer>
    <LoadingOutlined />
  </StyledEntityGridLoaderContainer>
);

export default memo(EntityGridLoader);
