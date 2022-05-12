import {Table} from 'antd';

import styled from 'styled-components';

import {ExecutionStatusEnum} from '@models/execution';

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

    .labels-list {
      li {
        border-color: white;

        color: white;
      }
    }

    .execution-status-block {
      svg {
        path {
          fill: white;
        }
      }

      span {
        color: white;
      }
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

export const StyledDashboardTableRow = styled.div`
  display: flex;

  &.row-active {
    .labels-list {
      li {
        border-color: white;

        color: white;
      }
    }

    .execution-status-block {
      svg {
        path {
          fill: white;
        }
      }

      span {
        color: white;
      }
    }
  }
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
    padding: 10px 15px;
    border: 1px solid #262626;

    cursor: pointer;
  }

  .dashboard-content-table > td:first-child {
    border: unset;
    padding: 0;
  }
`;

export const StyledExecutionStatus = styled.span<{status: ExecutionStatusEnum}>`
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
  margin-top: 10px;

  font-size: 12px;
  text-align: right;
`;

export const StyledTestRunnerType = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding-right: 15px;
`;
