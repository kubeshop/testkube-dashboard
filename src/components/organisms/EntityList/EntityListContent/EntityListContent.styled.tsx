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
