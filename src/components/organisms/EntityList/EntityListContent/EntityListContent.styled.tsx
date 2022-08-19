import styled from 'styled-components';

export const EntityListHeader = styled.div`
  padding-bottom: 30px;
`;

export const StyledEntityListSkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 32px;

  padding-top: 20px;
`;

export const EmptyListWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

export const StyledFiltersSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

export const StyledContainer = styled.div`
  overflow: auto;

  padding: 40px;
`;
