import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledDashboardFiltersContainer = styled.div`
  padding: 16px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;

  background: ${Colors.dashboardTableBackground};
`;

export const StyledSpace = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;
