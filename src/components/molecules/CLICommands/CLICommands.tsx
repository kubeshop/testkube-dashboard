import {useContext, useMemo} from 'react';

import {testExecutorsConfigs} from '@constants/testExecutors';

import {Entity} from '@models/entity';
import {ExecutionStatusEnum} from '@models/execution';
import {TestExecutor} from '@models/testExecutors';

import {EntityExecutionsContext} from '@contexts';

import CopyCommand from './CopyCommand';

type CLIScriptModifier = 'isFinished' | 'canHaveArtifacts';

type CLIScript = {
  label: string;
  command: (name: string) => string;
  modify?: CLIScriptModifier;
};

type CLIScriptKey = Entity | 'executions';

type CLICommandsProps = {
  isExecutions?: boolean;
  type: TestExecutor;
  name?: string;
  id?: string;
  modifyMap?: {
    status?: ExecutionStatusEnum;
  };
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
    modify: 'isFinished',
  },
  {
    label: 'Download artifacts',
    command: (name: string) => `kubectl testkube download artifacts ${name}`,
    modify: 'canHaveArtifacts',
  },
];

const scriptsByEntityType: {[key in CLIScriptKey]: CLIScript[]} = {
  'test-suites': testSuiteScripts,
  tests: testScripts,
  executions: executionsScripts,
};

const modifyActions: {
  [key in CLIScriptModifier]: (args: any) => boolean;
} = {
  canHaveArtifacts: canHaveArtifacts => {
    return !canHaveArtifacts;
  },
  isFinished: execStatus => {
    return execStatus !== 'running';
  },
};

const CLICommands: React.FC<CLICommandsProps> = props => {
  const {isExecutions, type, name, id, modifyMap} = props;

  const {entity} = useContext(EntityExecutionsContext);

  const CLIEntityType = isExecutions ? 'executions' : entity;

  const testExecutorConfig = testExecutorsConfigs[type as TestExecutor] || testExecutorsConfigs.unknown;

  const modifyArgsMap: {[key in CLIScriptModifier]: any} = {
    canHaveArtifacts: testExecutorConfig.canHaveArtifacts,
    isFinished: modifyMap?.status,
  };

  const renderedCLICommands = useMemo(() => {
    const testTarget = id || name;

    if (!testTarget) {
      return null;
    }

    return scriptsByEntityType[CLIEntityType].map(cliCommand => {
      const {command, label, modify} = cliCommand;

      if (modify) {
        const modifyArg = modifyArgsMap[modify];

        if (modifyActions[modify](modifyArg)) {
          return null;
        }
      }

      const commandString = isExecutions ? command(testTarget) : command(testTarget);

      return <CopyCommand key={label} command={commandString} label={label} />;
    }).filter(cliCommand => cliCommand);
  }, [id, name, type, modifyMap]);

  return <div>{renderedCLICommands}</div>;
};

export default CLICommands;
