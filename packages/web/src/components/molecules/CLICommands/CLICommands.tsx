import React, {useMemo} from 'react';

import {Text} from '@custom-antd';

import {Entity} from '@models/entity';
import {ExecutionStatusEnum} from '@models/execution';
import {TestExecutor} from '@models/testExecutors';

import {Permissions, usePermission} from '@permissions/base';

import {useClusterDetailsPick} from '@store/clusterDetails';
import {useEntityDetailsPick} from '@store/entityDetails';
import {useExecutorsPick} from '@store/executors';

import {useTelemetry} from '@telemetry/hooks';

import CopyCommand from './CopyCommand';

type CLIScriptModifier = 'isFinished' | 'canHaveArtifacts' | 'isRunPermission' | 'isDeletePermission';

type CLIScript = {
  label: string;
  command: (name: string, args: string[]) => string;
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
    modify: 'isRunPermission',
    command: (name: string, args: string[]) => `kubectl testkube run testsuite ${name} ${args.join(' ')}`,
  },
  {
    label: 'Delete test suite',
    command: (name: string, args: string[]) => `kubectl testkube delete testsuite ${name} ${args.join(' ')}`,
    modify: 'isDeletePermission',
  },
];

const testScripts: CLIScript[] = [
  {
    label: 'Run test',
    command: (name: string, args: string[]) => `kubectl testkube run test ${name} ${args.join(' ')}`,
    modify: 'isRunPermission',
  },
  {
    label: 'Get test',
    command: (name: string, args: string[]) => `kubectl testkube get test ${name} ${args.join(' ')}`,
  },
  {
    label: 'List executions',
    command: (name: string, args: string[]) => `kubectl testkube get executions --test ${name} ${args.join(' ')}`,
  },
  {
    label: 'Delete test',
    command: (name: string, args: string[]) => `kubectl testkube delete test ${name}  ${args.join(' ')}`,
    modify: 'isDeletePermission',
  },
];

const executionsScripts: CLIScript[] = [
  {
    label: 'Get execution',
    command: (name: string, args: string[]) => `kubectl testkube get execution ${name} ${args.join(' ')}`,
  },
  {
    label: 'Watch execution',
    command: (name: string, args: string[]) => `kubectl testkube watch execution ${name} ${args.join(' ')}`,
    modify: 'isFinished',
  },
  {
    label: 'Download artifacts',
    command: (name: string, args: string[]) => `kubectl testkube download artifacts ${name} ${args.join(' ')}`,
    modify: 'canHaveArtifacts',
  },
];

const scriptsByEntityType: Record<CLIScriptKey, CLIScript[]> = {
  'test-suites': testSuiteScripts,
  tests: testScripts,
  executions: executionsScripts,
};

const modifyActions: Record<CLIScriptModifier, (arg: boolean | string) => boolean> = {
  canHaveArtifacts: canHaveArtifacts => {
    return !canHaveArtifacts;
  },
  isFinished: execStatus => {
    return execStatus !== 'running';
  },
  isRunPermission: hasPermission => {
    return !hasPermission;
  },
  isDeletePermission: hasPermission => {
    return !hasPermission;
  },
};

const CLICommands: React.FC<CLICommandsProps> = props => {
  const {isExecutions, type, name, id, modifyMap, bg} = props;
  const mayRun = usePermission(Permissions.runEntity);
  const mayDelete = usePermission(Permissions.deleteEntity);

  const {entity} = useEntityDetailsPick('entity');
  const telemetry = useTelemetry();

  const {featuresMap} = useExecutorsPick('featuresMap');
  const {namespace} = useClusterDetailsPick('namespace');
  const CLIEntityType = isExecutions ? 'executions' : entity;

  const modifyArgsMap: Partial<Record<CLIScriptModifier, boolean | ExecutionStatusEnum>> = {
    ...(type && featuresMap[type] ? {canHaveArtifacts: featuresMap[type].includes('artifacts')} : {}),
    isFinished: modifyMap?.status,
    isRunPermission: mayRun,
    isDeletePermission: mayDelete,
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

        if (modifyArg && modifyActions[modify](modifyArg)) {
          return null;
        }
      }

      const commandArgs = [namespace !== 'testkube' ? `--namespace ${namespace}` : ''];
      const commandString = command(testTarget, commandArgs);

      const onCopy = () => {
        telemetry.event('copyCommand', {command: label});
      };

      return <CopyCommand key={label} command={commandString} label={label} bg={bg} onCopy={onCopy} highlightSyntax />;
    }).filter(cliCommand => cliCommand);
  }, [id, name, type, modifyMap]);

  return (
    <div>
      {(renderedCLICommands?.length && renderedCLICommands) || <Text className="regular">No CLI commands</Text>}
    </div>
  );
};

export default CLICommands;
