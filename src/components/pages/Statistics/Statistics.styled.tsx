import styled from 'styled-components';

export const StyledStatisticsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledStatisticsHeader = styled.div`
  margin-bottom: 20px;
`;

export const StyledTestStatisticsStatsContainer = styled.div`
  position: relative;
  top: 20px;
  left: 20px;
`;

export const StyledTestStatisticsCharts = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const StyledTestStatisticsChart = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  position: relative;
  top: 40px;
  left: 20px;
  width: 589px;
  height: 231px;
  background: var(--color-dark-tertiary);
  border: 1px solid var(--color-gray-senary);
  border-radius: 3px;
  overflow: hidden;
  margin-right: 20px;

  & > * {
    margin-left: 20px;
    margin-top: 15px;
  }
`;

export const StyledTestStatisticsCircularCharts = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const StyledTotalTestCurrentStatusChart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  top: 40px;
  left: 20px;
  width: 271px;
  height: 271px;
  background: var(--color-dark-tertiary);
  border: 1px solid var(--color-gray-senary);
  border-radius: 3px;
  overflow: hidden;
  margin-right: 20px;
`;

export const StyledAreaChart = styled.div`
  position: relative;
  top: -20px;
`;
