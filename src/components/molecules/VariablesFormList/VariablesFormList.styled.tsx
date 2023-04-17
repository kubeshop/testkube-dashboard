import {Form} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const VariablesListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLabelsSpace = styled.div<{noGap?: boolean}>`
  display: flex;
  align-items: flex-start;
  gap: ${props => (props.noGap ? '0' : '16px')};

  height: 44px;
  min-width: 200px;
  margin-bottom: 22px;
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

export const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

export const SymbolWrapper = styled.div`
  display: flex;
  align-items: center;

  height: 100%;
`;
