import styled from 'styled-components';

import {StyledInfoPanelSection} from '../../DashboardInfoPanel.styled';
import TestSummaryBlock from './TestsInfoPanelBlocks';

const StyledDescription = styled.span`
  color: #dbdbdb;

  font-size: 20px;
`;

const TestsInfoPanel = (props: any) => {
  const {selectedRecord} = props;
  const {name, namespace, description, steps} = selectedRecord;

  return (
    <>
      <StyledInfoPanelSection>
        <StyledDescription>{description}</StyledDescription>
      </StyledInfoPanelSection>
      <StyledInfoPanelSection>
        <TestSummaryBlock total={steps.length} />
      </StyledInfoPanelSection>
    </>
  );
};

export default TestsInfoPanel;
