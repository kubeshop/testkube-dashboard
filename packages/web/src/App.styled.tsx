import {Layout} from 'antd';

import styled from 'styled-components';

export const StyledLayoutContentWrapper = styled(Layout)`
  overflow: hidden;
`;

export const MessagePanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 30px 0 0;
`;
