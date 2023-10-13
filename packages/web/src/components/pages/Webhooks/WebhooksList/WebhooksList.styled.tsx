import styled from 'styled-components';

import Colors from '@styles/Colors';

export const WebhookContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  padding: 20px;
  border: 1px solid transparent;
  border-radius: 4px;

  background-color: ${Colors.slate800};

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border: 1px solid ${Colors.indigo400};

    background: ${Colors.slate850};
  }
`;
