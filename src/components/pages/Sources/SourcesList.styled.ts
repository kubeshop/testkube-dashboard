import styled from 'styled-components';

import {Colors} from '@styles/Colors';

export const SourceContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;

  padding: 20px;
  border: 1px solid transparent;
  border-radius: 4px;

  background-color: ${Colors.slate800};

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border: 1px solid #818cf8;
    background: #0f172a;
  }
`;

export const AddSourceModalContainer = styled.div`
  display: flex;
`;
