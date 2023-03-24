import React, {memo} from 'react';

import {Space} from 'antd';

import {LoadingOutlined} from '@ant-design/icons';

import {StyledEntityListLoaderContainer} from './EntityListContent.styled';

const EntityListLoader: React.FC = () => (
  <StyledEntityListLoaderContainer>
    <LoadingOutlined />
  </StyledEntityListLoaderContainer>
);

export default memo(EntityListLoader);
