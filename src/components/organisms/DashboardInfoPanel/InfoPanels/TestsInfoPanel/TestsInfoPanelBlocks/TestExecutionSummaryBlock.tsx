/* eslint-disable unused-imports/no-unused-imports-ts */
import {Link} from 'react-router-dom';

import {Button} from 'antd';

import {CheckCircleFilled, CloseCircleFilled} from '@ant-design/icons';

import styled from 'styled-components';

import {StyledInfoPanelSection, StyledInfoPanelSectionTitle} from '../../../DashboardInfoPanel.styled';

type ScriptExecutionSummaryProps = {
  total: number;
  failed: number;
  passed: number;
  scriptName: string;
};

const StyledSummaryContainer = styled.ul`
  display: flex;
  flex-direction: row;

  margin: 0;

  li:first-child {
    padding-left: 0;
  }

  li:not(:last-child) {
    border-right: 1px solid #393939;
  }

  li {
    padding: 0 20px;

    list-style-type: none;
  }
`;

const StyledSummaryItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
`;

const StyledSummaryItemTitle = styled.span`
  color: #fff;

  font-size: 16px;
`;

const StyledSummaryItemValue = styled.span`
  color: #fff;

  font-size: 26px;
`;

const StyledSummaryItemIconContainer = styled.div`
  span {
    margin-right: 5px;

    color: white;
  }
`;

const TestExecutionSummaryBlock: React.FC<ScriptExecutionSummaryProps> = props => {
  const {total, failed, passed, scriptName} = props;

  return (
    <StyledInfoPanelSection>
      <StyledInfoPanelSectionTitle>Executions</StyledInfoPanelSectionTitle>
      <StyledSummaryContainer>
        <StyledSummaryItem>
          <StyledSummaryItemTitle>Total</StyledSummaryItemTitle>
          <StyledSummaryItemValue>{total.toLocaleString()}</StyledSummaryItemValue>
        </StyledSummaryItem>
        <StyledSummaryItem>
          <StyledSummaryItemTitle>
            <StyledSummaryItemIconContainer>
              <CloseCircleFilled /> Failed
            </StyledSummaryItemIconContainer>
          </StyledSummaryItemTitle>
          <StyledSummaryItemValue>{failed.toLocaleString()}</StyledSummaryItemValue>
        </StyledSummaryItem>
        <StyledSummaryItem>
          <StyledSummaryItemTitle>
            <StyledSummaryItemIconContainer>
              <CheckCircleFilled /> Succeeded
            </StyledSummaryItemIconContainer>
          </StyledSummaryItemTitle>
          <StyledSummaryItemValue>{passed.toLocaleString()}</StyledSummaryItemValue>
        </StyledSummaryItem>
        {/* <StyledSummaryItem>
          <Button type="primary" ghost>
            <Link to={`/dashboard/executions?scriptName=${scriptName}`}>Show all Executions</Link>
          </Button>
        </StyledSummaryItem> */}
      </StyledSummaryContainer>
    </StyledInfoPanelSection>
  );
};

export default TestExecutionSummaryBlock;
