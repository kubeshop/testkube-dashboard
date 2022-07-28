import {Tabs} from 'antd';

import styled from 'styled-components';

import Colors, {StatusColors} from '@styles/Colors';

export const StyledExecutionDetailsContainer = styled.div``;

export const StyledExecutionDetailsHeader = styled.div`
  display: flex;

  padding: 30px 25px;
  border: 1px solid #393939;
  border-radius: 32px;

  background: #151515;
`;

export const StyledExecutionDetailsGeneralInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  padding-left: 25px;
`;

export const StyledExecutionStatusContainer = styled.div`
  display: flex;

  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #393939;
`;

export const StyledExecutionStatus = styled.span<{status: any}>`
  margin-left: 8px;

  color: ${props => StatusColors[props.status] || Colors.whitePure};

  font-size: 16px;
  line-height: 30px;
`;

export const StyledGeneralInfoItem = styled.div`
  display: flex;

  &:not(:first-child) {
    margin-top: 8px;
  }
`;

export const StyledGeneralInfoLabel = styled.span`
  color: ${Colors.lightGrey};

  font-size: 14px;
  font-weight: 700;
`;

export const StyledGeneralInfoValue = styled.span<{color?: string}>`
  color: ${props => props.color || Colors.lightGrey};
`;

export const StyledGeneralInfoGrid = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  gap: 12px 14px;
`;

export const StyledStatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 150px;
  height: auto;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

export const StyledAntTabs = styled(Tabs)`
  .ant-tabs-content-holder {
    overflow: auto;
  }

  .ant-tabs-nav-wrap {
    padding: 0 40px;

    .ant-tabs-tab {
      padding: 15px 0;

      .ant-tabs-tab-btn {
        color: ${Colors.grey450};

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

export const StyledAntTabPane = styled(Tabs.TabPane)``;

export const StyledTestExecutionDetailsTabsContainer = styled.div``;

export const StyledTestSuiteExecutionDetailsTabsContainer = styled.div``;

export const StyledStatusCode = styled.span`
  color: ${Colors.lightGrey};

  font-size: 14px;
`;

export const StyledTestSuiteExecutionResultsList = styled.ul`
  display: flex;
  flex-direction: column;

  margin: 0;
  padding: 0;

  background: #151515;

  list-style-type: none;
`;

export const StyledTestSuiteExecutionResultsListItem = styled.li`
  padding: 7px 15px;
  border: 1px solid #393939;

  color: ${Colors.whitePure};
`;
