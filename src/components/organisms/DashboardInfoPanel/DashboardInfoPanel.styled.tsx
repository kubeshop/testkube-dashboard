import {Table, Tabs} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

import {getInfoPanelFlexProperty} from './infoPanelStyleHelpers';

export const StyledDashboardInfoPanelContainer = styled.div<{
  isInfoPanelExpanded?: boolean;
  shouldInfoPanelBeShown: boolean;
  isSecondLevelOpen?: boolean;
  isRecordSelected?: boolean;
}>`
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  flex: ${props => getInfoPanelFlexProperty(props)};

  height: 100%;

  background: #1d1d1d;

  transition: 0.3s flex;
`;

export const StyledCollapseButtonContainer = styled.div<{isInfoPanelExpanded: boolean; isSecondLevelOpen: boolean}>`
  display: flex;
  justify-content: ${props => (props.isInfoPanelExpanded ? 'flex-end' : 'center')};

  padding: 15px;
  width: ${props => (props.isInfoPanelExpanded ? (props.isSecondLevelOpen ? '40%' : '100%') : '80px')};

  cursor: pointer;

  &:last-child {
    width: ${props => (props.isInfoPanelExpanded ? (props.isSecondLevelOpen ? '60%' : '100%') : '80px')};

    background: ${props => (props.isSecondLevelOpen ? '#262626' : '#1d1d1d')};
  }
`;

export const StyledInfoPanelSection = styled.div<{isBorder?: boolean}>`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 20px 40px;

  ${props => (props.isBorder ? 'border-bottom: 1px solid #393939;' : '')}
`;

export const StyledInfoPanelSectionTitle = styled.span`
  padding-bottom: 10px;

  color: #dbdbdb;

  font-size: 24px;
`;

export const StyledDashboardInfoPanelSecondLevelContainer = styled.div<{
  isInfoPanelExpanded?: boolean;
  shouldInfoPanelBeShown: boolean;
  isSecondLevelOpen?: boolean;
}>`
  overflow: auto;

  flex: ${props => (props.isSecondLevelOpen ? '3' : '0')};

  display: flex;
  flex-direction: column;

  background: #262626;

  // transition: 0.5s all;
`;

export const StyledEmptyDashboardInfoPanel = styled.div`
  display: flex;
  justify-content: center;

  height: 100%;
  padding: 0 50px;
  margin-top: 250px;
`;

export const StyledEmptyDashboardInfoPanelText = styled.span`
  color: #adadad;

  font-size: 20px;
  text-align: center;
`;

export const StyledAntTabs = styled(Tabs)`
  .ant-tabs-content-holder {
    overflow: auto;
  }

  .ant-tabs-nav-wrap {
    padding: 0 40px;
    border-bottom: 1px solid #393939;

    .ant-tabs-tab {
      padding: 15px 0;

      .ant-tabs-tab-btn {
        color: #dbdbdb;

        font-size: 16px;
        font-weight: 400;
      }

      &-active {
        .ant-tabs-tab-btn {
          color: ${Colors.purple};
        }
      }
    }
  }
`;

export const StyledTable = styled(Table)<{gradient?: string}>`
  .ant-table {
    // border: unset !important;

    background: #151515;
  }

  .ant-pagination {
    justify-content: center;
  }

  .ant-table-tbody > tr.ant-table-row:hover {
    background: ${props => props.gradient} !important;

    & > td {
      background: unset;
    }

    span {
      path {
        fill: ${Colors.whitePure};
      }
    }
  }

  .ant-table-tbody > tr.ant-table-row-selected {
    background: ${props => props.gradient};

    .ant-btn {
      color: white;
      border-color: white;
    }

    span {
      path {
        fill: ${Colors.whitePure};
      }
    }
  }

  .ant-table-tbody {
    tr {
      td.ant-table-selection-column {
        display: none;
      }

      td {
        display: flex;
        align-items: center;
        justify-content: center;

        border: 1px solid #393939;
        border-radius: 3px;
        padding: 10px 16px;

        background: unset;
      }
    }
  }
`;

export const StyledCollapseButtonsContainer = styled.div`
  display: flex;
`;

export const StyledDashboardInfoPanelContentContainer = styled.div`
  position: relative;
  overflow: scroll;

  display: flex;
  flex: 1;
`;

export const StyledDashboardInfoPanelContent = styled.div`
  position: relative;
  overflow: auto;

  display: flex;
  flex-direction: column;
  flex: 2;
`;
