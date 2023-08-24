import {FC, memo} from 'react';

import {LoadingOutlined} from '@ant-design/icons';

import {StyledEntityGridLoaderContainer} from '@molecules/EntityGrid.styled';

export const EntityGridLoader: FC = memo(() => (
  <StyledEntityGridLoaderContainer>
    <LoadingOutlined />
  </StyledEntityGridLoaderContainer>
));
