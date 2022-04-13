import {useContext} from 'react';

import {DashboardBlueprintType} from '@models/dashboard';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import {StyledInfoPanelSection} from '../../organisms/DashboardInfoPanel/DashboardInfoPanel.styled';
import CopyCommand from './CopyCommand';

type CLIScript = {
  label: string;
  command: (name: string) => string;
};

type CLIScriptKey = DashboardBlueprintType | 'executions';

type CLICommandsProps = {
  isExecutions?: boolean;
};

const testSuiteScripts: CLIScript[] = [
  {
    label: 'Start test suite',
    command: (name: string) => `kubectl testkube run testsuite ${name}`,
  },
  {
    label: 'Delete test suite',
    command: (name: string) => `kubectl testkube delete testsuite ${name}`,
  },
];

const testScripts: CLIScript[] = [
  {
    label: 'Start test',
    command: (name: string) => `kubectl testkube run test ${name}`,
  },
  {
    label: 'Delete test',
    command: (name: string) => `kubectl testkube delete test ${name}`,
  },
  {
    label: 'Get test',
    command: (name: string) => `kubectl testkube get test ${name}`,
  },
  {
    label: 'Get test executions',
    command: (name: string) => `kubectl testkube get executions --test ${name}`,
  },
];

const executionsScripts: CLIScript[] = [
  {
    label: 'Get execution',
    command: (name: string) => `kubectl testkube get execution ${name}`,
  },
  {
    label: 'Watch execution',
    command: (name: string) => `kubectl testkube watch execution ${name}`,
  },
  {
    label: 'Download artifacts',
    command: (name: string) => `kubectl testkube download artifacts ${name}`,
  },
];

const scriptsByEntityType: {[key in CLIScriptKey]: CLIScript[]} = {
  'test-suites': testSuiteScripts,
  tests: testScripts,
  executions: executionsScripts,
};

const CLICommands: React.FC<CLICommandsProps> = props => {
  const {isExecutions} = props;

  const {data} = useContext(DashboardInfoPanelSecondLevelContext);
  const {selectedRecord, entityType} = useContext(DashboardContext);
  const {name} = selectedRecord;

  const CLIEntityType = isExecutions ? 'executions' : entityType;

  const renderedCLICommands = scriptsByEntityType[CLIEntityType].map(value => {
    const commandString = isExecutions ? value.command(data?.id) : value.command(name);

    return <CopyCommand key={value.label} command={commandString} label={value.label} />;
  });

  return <StyledInfoPanelSection>{renderedCLICommands}</StyledInfoPanelSection>;
};

export default CLICommands;
