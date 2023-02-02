import React, {useContext, useMemo} from 'react';

import {Entity} from '@models/entity';
import {ExecutionStatusEnum} from '@models/execution';
import {TestExecutor} from '@models/testExecutors';

import {useAppSelector} from '@redux/hooks';
import {selectExecutorsFeaturesMap} from '@redux/reducers/executorsSlice';

import {EntityDetailsContext} from '@contexts';

import CopyCommand from './CopyCommand';

type CLIScriptModifier = 'isFinished' | 'canHaveArtifacts';

type CLIScript = {
  label: string;
  command: (name: string) => string;
  filename?: string;
  modify?: CLIScriptModifier;
};

type CLIScriptKey = Entity | 'executions';

type CLICommandsProps = {
  isExecutions?: boolean;
  type?: TestExecutor;
  name?: string;
  id?: string;
  bg?: string;
  modifyMap?: {
    status?: ExecutionStatusEnum;
  };
};

const testSuiteScripts: CLIScript[] = [
  {
    label: 'Run test suite',
    command: (name: string) => `kubectl testkube run testsuite ${name}`,
    filename: 'run-test-suite.sh',
  },
  {
    label: 'Delete test suite',
    command: (name: string) => `kubectl testkube delete testsuite ${name}`,
    filename: 'delete-test-suite.sh',
  },
];

const testScripts: CLIScript[] = [
  {
    label: 'Run test',
    command: (name: string) => `kubectl testkube run test ${name}`,
    filename: 'run-test.sh',
  },
  {
    label: 'Get test',
    command: (name: string) => `kubectl testkube get test ${name}`,
    filename: 'get-test.sh',
  },
  {
    label: 'List executions',
    command: (name: string) => `kubectl testkube get executions --test ${name}`,
    filename: 'list-executions.sh',
  },
  {
    label: 'Delete test',
    command: (name: string) => `kubectl testkube delete test ${name}`,
    filename: 'delete-executions.sh',
  },
];

const executionsScripts: CLIScript[] = [
  {
    label: 'Get execution',
    command: (name: string) => `kubectl testkube get execution ${name}`,
    filename: 'get-executions.sh',
  },
  {
    label: 'Watch execution',
    command: (name: string) => `kubectl testkube watch execution ${name}`,
    filename: 'watch-executions.sh',
  },
  {
    label: 'Download artifacts',
    command: (name: string) => `kubectl testkube download artifacts ${name}`,
    filename: 'download-artifacts.sh',
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
  const {isExecutions, type, name, id, modifyMap, bg} = props;

  const {entity} = useContext(EntityDetailsContext);

  const executorsFeaturesMap = useAppSelector(selectExecutorsFeaturesMap);

  const CLIEntityType = isExecutions ? 'executions' : entity;

  const modifyArgsMap: Partial<{[key in CLIScriptModifier]: any}> = {
    ...(type ? {canHaveArtifacts: executorsFeaturesMap[type].includes('artifacts')} : {}),
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

      const commandString = command(testTarget);

      return <CopyCommand key={label} command={commandString} label={label} bg={bg} />;
    }).filter(cliCommand => cliCommand);
  }, [id, name, type, modifyMap]);

  return <div>{renderedCLICommands}</div>;
};

export default CLICommands;
