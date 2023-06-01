import {Form} from 'antd';

import styled from 'styled-components';

import Fonts from '@styles/Fonts';

const {Item: AntdFormItem} = Form;

export const StyledFormItemLabel = styled.label`
  font-family: ${Fonts.nunito};
  font-weight: 300;
`;

export const StyledFormItem = styled(AntdFormItem)`
  flex: 1;

  margin-bottom: 0;
`;
