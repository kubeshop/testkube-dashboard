import {Form, Space} from 'antd';

import styled from 'styled-components';

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
