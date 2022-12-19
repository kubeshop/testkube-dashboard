import styled from 'styled-components';

import Colors from '@styles/Colors';
import {maxDevice} from '@styles/MediaQueries';

export const SourcesListSkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 32px;
`;

export const SourcesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media ${maxDevice.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const SourceContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

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
