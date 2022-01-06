import styled from 'styled-components';

export const StyledDashboardContentContainer = styled.div<{
  shouldInfoPanelBeShown: boolean;
  isInfoPanelExpanded: boolean;
}>`
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 70px ${props => (props.shouldInfoPanelBeShown ? (props.isInfoPanelExpanded ? '665px' : '115px') : '35px')}
    50px 0px;

  transition: 0.5s all;

  .ant-table-tbody > tr.ant-table-row-selected > td {
    background: var(--color-monokle-secondary);

    .ant-btn {
      color: white;
      border-color: white;
    }
  }

  .ant-table-selection-column {
    .ant-table-selection {
      display: none;
    }
  }
`;
