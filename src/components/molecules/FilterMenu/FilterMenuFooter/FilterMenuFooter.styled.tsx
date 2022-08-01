import {Space} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledSpace = styled(Space)`
  width: 100%;

  justify-content: flex-end;

  margin-top: 4px;
  padding: 8px 12px 4px;

  border-top: 1px solid ${Colors.slate800};
`;
