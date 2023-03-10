import {Form, Space} from 'antd';

import styled, {keyframes} from 'styled-components';

export const StyledFormSpace = styled(Space)`
  width: 100%;

  .ant-form-item-control-input-content {
    display: flex;
    justify-content: flex-end;
  }
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;
`;
const dropdownAnimation = keyframes`
 0% { height: 1px; }
 100% { height: 500px; }
`;

export const StyledFormSpaceDropdown = styled(StyledFormSpace)``;
