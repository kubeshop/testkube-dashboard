import styled from 'styled-components';

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

  .ant-table-row {
    border: unset !important;
  }

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
