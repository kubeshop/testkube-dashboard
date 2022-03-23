import {useContext} from 'react';

import {DashboardBlueprintType} from '@models/dashboard';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {
  StyledInfoPanelSection,
  StyledInfoPanelSectionTitle,
} from '../../organisms/DashboardInfoPanel/DashboardInfoPanel.styled';
import CopyCommand from './CopyCommand';

type CLIScript = {
  label: string;
  command: (name: string) => string;
};

const testSuiteScripts: CLIScript[] = [
  {label: 'Start test suite', command: (name: string) => `kubectl testkube testsuite run ${name}`},
  {
    label: 'Delete test suite',
    command: (name: string) => `kubectl testkube testsuite delete ${name}`,
  },
];

const testScripts: CLIScript[] = [
  {label: 'Start test', command: (name: string) => `kubectl testkube test run ${name}`},
  {
    label: 'Delete test',
    command: (name: string) => `kubectl testkube test delete ${name}`,
  },
];

const scriptsByEntityType: {[key in DashboardBlueprintType]: CLIScript[]} = {
  'test-suites': testSuiteScripts,
  tests: testScripts,
};

const CLICommands: React.FC = () => {
  const {selectedRecord, entityType} = useContext(DashboardContext);
  const {name} = selectedRecord;

  const renderedCLICommands = scriptsByEntityType[entityType].map(value => {
    const commandString = value.command(name);

    return <CopyCommand key={value.label} command={commandString} label={value.label} />;
  });

  return (
    <StyledInfoPanelSection>
      <StyledInfoPanelSectionTitle>CLI Commands</StyledInfoPanelSectionTitle>
      {renderedCLICommands}
    </StyledInfoPanelSection>
  );
};

export default CLICommands;
