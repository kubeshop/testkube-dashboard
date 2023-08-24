import styled from 'styled-components';

import {Colors} from '@styles/Colors';

export const AiInsightContainer = styled.div`
  width: 100%;
  border: 1px solid ${Colors.indigo400};
  border-radius: 4px;
  background-color: ${Colors.slate900};
`;

export const AiInsightContent = styled.div`
  padding: 40px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
