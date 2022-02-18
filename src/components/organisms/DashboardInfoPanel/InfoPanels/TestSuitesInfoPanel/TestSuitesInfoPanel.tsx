import styled from 'styled-components';

import {CLICommands} from '@molecules';

import {StyledInfoPanelSection} from '../../DashboardInfoPanel.styled';
import TestSummaryBlock from './TestSuitesInfoPanelBlocks';

const StyledDescription = styled.span`
  color: #dbdbdb;

  font-size: 20px;
`;

const TestSuitesInfoPanel = (props: any) => {
  const {selectedRecord} = props;
  const {name, namespace, description, steps} = selectedRecord;

  const testCommands = [
    {command: `kubectl testkube testsuite run ${name}`, label: 'Start test suite'},
    {command: `kubectl testkube testsuite delete ${name}`, label: 'Delete test suite'},
  ];

  return (
    <>
      <StyledInfoPanelSection>
        <StyledDescription>{description}</StyledDescription>
      </StyledInfoPanelSection>
      <StyledInfoPanelSection>
        <TestSummaryBlock total={steps.length} />
      </StyledInfoPanelSection>
      <CLICommands cliCommands={testCommands} />
    </>
  );
};

export default TestSuitesInfoPanel;
