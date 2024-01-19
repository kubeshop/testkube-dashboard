import styled from 'styled-components';

export const ArtifactsListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  max-height: 70vh;
  padding: 0;
  margin: 0;

  overflow-y: auto;

  list-style-type: none;
`;

export const ProcessingContainer = styled.div`
  margin: 16px 0 16px 12px;
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 12px;
`;
