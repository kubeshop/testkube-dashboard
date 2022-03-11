import {Typography} from 'antd';

import styled from 'styled-components';

export const StyledTitle = styled(Typography.Title)<{font?: string}>`
  color: #fff !important;

  font-size: 20px;
  font-family: ${props => props.font};
  font-weight: 300 !important;
`;
