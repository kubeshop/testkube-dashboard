import styled from 'styled-components';

export const StyledNotificationContainer = styled.div<{$bg: string}>`
  padding: 20px;
  border-radius: 5px;

  background: ${props => props.$bg};
`;
export const StyledNotificationHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

export const StyledNotificationMessage = styled.div`
  margin-top: 20px;
`;
