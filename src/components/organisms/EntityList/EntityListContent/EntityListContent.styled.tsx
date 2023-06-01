import styled from 'styled-components';

import Colors from '@styles/Colors';

export const HeaderContainer = styled.div`
  padding-bottom: 20px;
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
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;

  padding: 0 30px 60px 0;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;

  padding: 30px 0 0;

  background-color: ${Colors.slate900};

  z-index: 1000;
`;

export const StyledEntityListLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  min-height: 80px;
`;
