import {Image, Space} from 'antd';

import styled from 'styled-components';

import {Title} from '@custom-antd';

import Colors from '@styles/Colors';

export const StyledButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

export const StyledEmptyContentImage = styled(Image)``;

export const StyledContainer = styled(Space)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;
`;

export const StyledNotFoundTitle = styled(Title)``;

export const StyledDescription = styled.span`
  color: ${Colors.slate300};

  font-size: 18px;
  font-weight: 400;
`;
