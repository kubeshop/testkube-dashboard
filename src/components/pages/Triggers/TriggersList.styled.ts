import styled from 'styled-components';

import {Colors} from '@styles/Colors';

export const TriggerContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  flex: 1;
  gap: 12px;
  padding: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  width: 100%;

  background: ${Colors.slate800};

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border: 1px solid ${Colors.indigo400};

    background: ${Colors.slate850};
  }
`;
