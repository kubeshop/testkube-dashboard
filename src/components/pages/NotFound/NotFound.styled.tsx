import {Image, Space} from 'antd';

import styled from 'styled-components';

import {Title} from '@custom-antd';

import Colors from '@styles/Colors';

export const StyledNotFoundImage = styled(Image)``;

export const StyledNotFoundContainer = styled(Space)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;
`;

export const StyledNotFoundTitle = styled(Title)``;

export const StyledNotFoundDescription = styled.span`
  color: ${Colors.slate300};

  font-size: 18px;
  font-weight: 400;
`;
