import styled from 'styled-components';

import {StyledInfoPanelSectionTitle} from '../../../DashboardInfoPanel.styled';

type ScriptExecutionsSummaryProps = {
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
  color: #dbdbdb;

  font-size: 26px;
`;

const TestSummaryBlock: React.FC<any> = props => {
  const {total, repeats} = props;

  return (
    <>
      <StyledInfoPanelSectionTitle>Details</StyledInfoPanelSectionTitle>
      <StyledSummaryContainer>
        <StyledSummaryItem>
          <StyledSummaryItemTitle>Total Test Steps</StyledSummaryItemTitle>
          <StyledSummaryItemValue>{total.toLocaleString()}</StyledSummaryItemValue>
        </StyledSummaryItem>
        <StyledSummaryItem>
          <StyledSummaryItemTitle>Repeats</StyledSummaryItemTitle>
          <StyledSummaryItemValue>{repeats ? repeats.toLocaleString() : '0'}</StyledSummaryItemValue>
        </StyledSummaryItem>
      </StyledSummaryContainer>
    </>
  );
};

export default TestSummaryBlock;
