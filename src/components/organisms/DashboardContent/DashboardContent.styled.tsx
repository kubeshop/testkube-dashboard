import {Table} from 'antd';

import styled from 'styled-components';

import Colors, {StatusColors} from '@styles/Colors';

export const StyledDashboardContentContainer = styled.div<{
  shouldInfoPanelBeShown: boolean;
  isInfoPanelExpanded: boolean;
  isSecondLevelOpen: boolean;
  gradient?: string;
}>`
  position: relative;
  overflow: auto;

  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 0;

  .ant-table-tbody > tr.ant-table-row:hover {
    background: ${props => props.gradient} !important;

    & > td {
      background: unset;
    }
  }

  .ant-table-tbody > tr.ant-table-row-selected {
    background: ${props => props.gradient};

    .ant-btn {
      color: white;
      border-color: white;
    }
  }

  .ant-table-tbody > tr.ant-table-row-selected > td {
    background: unset;

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

export const StyledDashboardContentTitleGradient = styled.div<{gradient?: string}>`
  position: absolute;
  top: 0;
  z-index: 1;

  height: 500px;
  width: 100%;

  background: ${props => props.gradient};
`;

export const StyledDashboardContentTitleBottomGradient = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 2;

  height: 250px;
  width: 100%;

  background: linear-gradient(0.36deg, #151515 59.16%, rgba(21, 21, 21, 0) 96.43%);
`;

export const StyledDashboardContent = styled.div`
  position: relative;
  z-index: 3;

  padding: 40px 20px 0px 20px;
`;

export const StyledDashboardTableRow = styled.div`
  display: flex;
`;

export const StyledTableRowLeftPartContainer = styled.div<{isNameOnly: boolean}>`
  display: flex;
  flex-direction: column;
  ${props => (props.isNameOnly ? 'justify-content: center;' : '')}
  flex: 1;
`;

export const StyledTableRowRightPartContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTableRowTitle = styled.span`
  color: ${Colors.whitePure};

  font-weight: 400;
  font-size: 16px;
`;

export const StyledContentTable = styled(Table)`
  .ant-table {
    border: 1px solid #262626;
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #262626;
    // border: unset;
  }

  .ant-table-tbody > tr.ant-table-row-selected > td {
    border-color: #262626;
  }

  .ant-pagination {
    justify-content: center;
  }

  .dashboard-content-table {
    background: var(--color-dark-tertiary);
  }

  .dashboard-content-table > td {
    padding: 10px 25px;
    border: 1px solid #262626;

    cursor: pointer;
  }

  .dashboard-content-table > td:first-child {
    border: unset;
    padding: 0;
  }
`;

export const StyledExecutionStatus = styled.span<{status: 'passed' | 'failed' | 'running' | 'queued'}>`
  margin-left: 8px;

  color: ${props => StatusColors[props.status]};

  font-size: 16px;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const RecentDateContainer = styled.div`
  margin-top: 10;

  color: ${Colors.greySecondary};

  font-size: 12px;
  text-align: right;
`;
