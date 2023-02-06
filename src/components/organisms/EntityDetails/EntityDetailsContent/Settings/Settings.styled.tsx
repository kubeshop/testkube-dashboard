import {Form, Space} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledSpace = styled(Space)`
  width: 100%;
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0px;
`;

export const StyledPopoverContainer = styled.div`
  padding: 12px 16px;

  border-radius: 4px;

  background: ${Colors.slate700};
`;
