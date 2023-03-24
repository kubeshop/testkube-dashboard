import {Form, Space} from 'antd';

import {QuestionCircleOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledSpace = styled(Space)`
  width: 100%;
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;
`;

export const StyledPopoverContainer = styled.div`
  padding: 12px 16px;

  border-radius: 4px;
`;

export const StyledQuestionCircleOutlined = styled(QuestionCircleOutlined)`
  margin-left: 10px;
`;
