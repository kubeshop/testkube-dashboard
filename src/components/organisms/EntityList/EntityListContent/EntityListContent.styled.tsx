import styled from 'styled-components';

import Colors from '@styles/Colors';

export const HeaderContainer = styled.div`
  padding-bottom: 30px;
`;

export const StyledEntityListSkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 32px;
`;

export const EmptyListWrapper = styled.div`
  display: flex;
  flex: auto;
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

  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 0 40px 60px 1vw;
`;

export const Header = styled.div`
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: column;

  padding: 40px 0 30px;

  background-color: ${Colors.slate900};

  z-index: 1000;
`;
