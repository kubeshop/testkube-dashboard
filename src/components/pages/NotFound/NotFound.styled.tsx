import {Typography} from 'antd';

import styled from 'styled-components';

const {Title} = Typography;

export const StyledNotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

export const StyledNotFoundTitle = styled(Title)`
  margin: 0 !important;

  color: #fff !important;
`;
