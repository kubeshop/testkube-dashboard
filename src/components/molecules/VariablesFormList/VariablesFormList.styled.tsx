import {Button, Form} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

export const VariablesListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled.div<{basis?: string; flex?: string}>`
  flex: ${props => props.flex || 'auto'};
  min-width: 50px;

  color: ${Colors.grey450};
  font-family: ${Fonts.nunito};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

export const Asterisk = styled.span`
  &:after {
    content: '*';
    margin: 0 4px;
  }

  color: ${Colors.errorRed};
`;

export const StyledLablesSpace = styled.div<{noGap?: boolean}>`
  display: flex;
  align-items: flex-start;
  gap: ${props => (props.noGap ? '0' : '16px')};

  min-width: 200px;
  margin-bottom: 25px;

  &:first-child {
    margin-top: 24px;
  }
`;

export const StyledPopoverContent = styled.div`
  width: 180px;

  color: ${Colors.grey450};
  font-family: ${Fonts.nunito};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

export const StyledKeyFormItem = styled(Form.Item)<{$showClearIcon?: boolean}>`
  .ant-input-suffix {
    ${props =>
      props.$showClearIcon
        ? `svg {
      fill: ${Colors.errorRed};
    }`
        : `display: none;`}
  }
`;

export const StyledAddButton = styled(Button)`
  height: 24px;
  width: 96px;
  padding: 0;

  border: 1px solid ${Colors.greyBorder};
  border-radius: 2px;

  background: transparent;

  color: ${Colors.grey450};

  &:focus {
    border: 1px solid ${Colors.greyBorder};
    color: ${Colors.grey450};
  }

  &:hover {
    color: ${Colors.purple};
  }
`;

export const StyledSaveButton = styled(Button)`
  height: 24px;
  width: 96px;
  padding: 0;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;
