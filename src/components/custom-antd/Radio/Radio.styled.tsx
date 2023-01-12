import {Radio, RadioProps} from 'antd';

import styled from 'styled-components';

export interface ICustomRadioProps extends RadioProps {
  checked?: boolean;
}

export const AntdCustomStyledRadio = styled(Radio)<ICustomRadioProps>`
`;
