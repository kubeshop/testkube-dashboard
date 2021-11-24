import styled from "styled-components";

export const StyledArtifactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

export const StyledArtifacts = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 550px;
  height: 38px;
  color: var(--color-light-primary);
  background: var(--color-dark-tertiary);
  border: 1px solid var(--color-gray-senary);
  border-radius: 3px;
`;

export const StyledFileArtifactsFileName = styled.div`
  display: flex;
`;

export const StyledNoArtifactsFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 550px;
  height: 38px;
  color: var(--color-light-primary);
  background: #ff4d4fb3;
  border: 1px solid var(--color-gray-senary);
`;
