import styled from 'styled-components';

export const StyledTestStatisticsContainer = styled.div`
  display: flex;
`;

export const StyledTestStatistic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-dark-tertiary);
  width: 183px;
  height: 151px;
  border: 1px solid var(--color-gray-senary);
  border-radius: 3px;
  margin-right: 20px;
`;

export const TestStatsSpan = styled.span`
  font-size: 84px;
  color: var(--color-gray-primary);
  margin-bottom: -10px;
`;
