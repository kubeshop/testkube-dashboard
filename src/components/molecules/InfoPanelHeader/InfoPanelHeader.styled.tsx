import {Button} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledInfoPanelHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 20px 40px 10px 40px;

  h4 {
    margin-bottom: 0;
  }
`;

export const StyledInfoPanelHeaderLeftPart = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledInfoPanelHeaderRightPart = styled.div`
  // display: flex;
  // justify-content: flex-end;
`;

export const StyledRunButton = styled(Button)`
  height: unset;
  padding: 10px 40px;
  border: 1px solid ${Colors.purple};
  border-radius: 32px;

  color: ${Colors.whitePure};
  background: ${Colors.purple};

  font-size: 16px;
  text-align: center;

  &:hover,
  &:focus {
    border: 1px solid ${Colors.purple};

    color: ${Colors.purple};
    background: transparent;
  }
`;

export const StyledInfoPanelHeaderDescription = styled.span`
  color: ${Colors.grey500};

  font-size: 15px;
`;
