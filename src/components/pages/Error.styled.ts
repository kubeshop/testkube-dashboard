import {Space} from 'antd';

import styled from 'styled-components';

import {Colors} from '@styles/Colors';

export const StyledErrorContainer = styled(Space)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;
`;

export const StyledErrorDescription = styled.div`
  max-width: 600px;
  color: ${Colors.slate300};

  font-size: 18px;
  font-weight: 400;
  text-align: center;
`;
