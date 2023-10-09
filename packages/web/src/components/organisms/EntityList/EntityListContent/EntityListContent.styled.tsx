import styled from 'styled-components';

import Colors from '@styles/Colors';

export const HeaderContainer = styled.div`
  padding-bottom: 20px;
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

export const Header = styled.div`
  display: flex;
  flex-direction: column;

  padding: 30px 0 0;

  background-color: ${Colors.slate900};

  z-index: 1000;
`;
