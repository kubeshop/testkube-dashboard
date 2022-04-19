import {useContext} from 'react';

import {DashboardBlueprintType} from '@models/dashboard';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import {testExecutorsConfigs} from '@src/constants/testExecutors';
import {TestExecutor} from '@src/models/testExecutors';

import {StyledInfoPanelSection} from '../../organisms/DashboardInfoPanel/DashboardInfoPanel.styled';
import CopyCommand from './CopyCommand';

type CLIScriptModificator = 'isFinished' | 'canHaveArtifacts';

type CLIScript = {
  label: string;
  command: (name: string) => string;
  modificator?: CLIScriptModificator;
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
    modificator: 'isFinished',
  },
  {
    label: 'Download artifacts',
    command: (name: string) => `kubectl testkube download artifacts ${name}`,
    modificator: 'canHaveArtifacts',
  },
];

const scriptsByEntityType: {[key in CLIScriptKey]: CLIScript[]} = {
  'test-suites': testSuiteScripts,
  tests: testScripts,
  executions: executionsScripts,
};

const modificatorActions: {
  [key in CLIScriptModificator]: (args: any) => boolean;
} = {
  canHaveArtifacts: canHaveArtifacts => {
    return !canHaveArtifacts;
  },
  isFinished: execStatus => {
    return execStatus !== 'running';
  },
};

const CLICommands: React.FC<CLICommandsProps> = props => {
  const {isExecutions} = props;

  const {data} = useContext(DashboardInfoPanelSecondLevelContext);
  const {selectedRecord, entityType} = useContext(DashboardContext);
  const {name, type} = selectedRecord;

  const CLIEntityType = isExecutions ? 'executions' : entityType;

  const testExecutorConfig = testExecutorsConfigs[type as TestExecutor] || testExecutorsConfigs.unknown;

  const modificatorArgsMap: {[key in CLIScriptModificator]: any} = {
    canHaveArtifacts: testExecutorConfig.canHaveArtifacts,
    isFinished: data?.executionResults?.status,
  };

  const renderedCLICommands = scriptsByEntityType[CLIEntityType].map(cliCommand => {
    const {command, label, modificator} = cliCommand;

    if (modificator) {
      const modificatorArg = modificatorArgsMap[modificator];

      if (modificatorActions[modificator](modificatorArg)) {
        return null;
      }
    }

    const commandString = isExecutions ? command(data?.id) : command(name);

    return <CopyCommand key={label} command={commandString} label={label} />;
  }).filter(cliCommand => cliCommand);

  return <StyledInfoPanelSection>{renderedCLICommands}</StyledInfoPanelSection>;
};

export default CLICommands;
