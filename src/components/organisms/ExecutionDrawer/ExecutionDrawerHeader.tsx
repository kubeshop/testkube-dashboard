import {FC, useMemo} from 'react';

import {CloseOutlined} from '@ant-design/icons';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import {StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import {Execution} from '@models/execution';
import {TestSuiteExecution} from '@models/testSuiteExecution';

import {DotsDropdown, RunningContext} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useEntityDetailsPick} from '@store/entityDetails';
import {useExecutionDetailsPick} from '@store/executionDetails';

import Colors from '@styles/Colors';

import {formatDuration, formatExecutionDate} from '@utils/formatDate';

import {DrawerHeader, HeaderContent, ItemColumn, ItemRow} from './ExecutionDrawer.styled';

interface ExecutionDrawerHeaderProps {
  useAbortExecution: UseMutation<MutationDefinition<any, any, any, any, any>>;
}

const ExecutionDrawerHeader: FC<ExecutionDrawerHeaderProps> = ({useAbortExecution}) => {
  const {entity, id} = useEntityDetailsPick('entity', 'id');
  const {close, data, id: execId} = useExecutionDetailsPick('close', 'data', 'id');
  const mayManageExecution = usePermission(Permissions.manageEntityExecution);

  const status = (data as Execution)?.executionResult?.status || (data as TestSuiteExecution)?.status;
  const isRunning = status === 'running';

  const [abortExecution] = useAbortExecution();
  const onAbortExecution = () => {
    if (id && execId) {
      abortExecution({executionId: execId, id});
    }
  };

  const actions = useMemo(
    () => [{key: 1, label: <span onClick={onAbortExecution}>Abort execution</span>}],
    [useAbortExecution]
  );

  return (
    <DrawerHeader>
      <div style={{marginTop: '5px'}}>
        <StatusIcon status={status} />
      </div>
      <HeaderContent>
        <ItemRow $flex={1}>
          <ItemColumn>
            <Text className="biggest bold" ellipsis title={data?.name}>
              {data?.name}
            </Text>
          </ItemColumn>
          <ItemColumn className="flex-auto">
            {isRunning && mayManageExecution ? <DotsDropdown items={actions} /> : null}
            <CloseOutlined onClick={close} style={{color: Colors.slate400, fontSize: 20}} />
          </ItemColumn>
        </ItemRow>
        <ItemRow $flex={1}>
          <ItemColumn>
            {data?.number ? <Text color={Colors.slate50}>#{data?.number}</Text> : null}
            <Text ellipsis>
              <Text color={Colors.slate400}>Trigger:&nbsp;</Text>
              <RunningContext
                id={id!}
                type={data?.runningContext?.type}
                context={data?.runningContext?.context}
                onClose={close}
                entity={entity}
              />
            </Text>
            <Text color={Colors.slate50}>
              <Text color={Colors.slate400}>Started:&nbsp;</Text>
              {formatExecutionDate(new Date(data?.startTime!))}
            </Text>
            {isRunning ? null : (
              <Text color={Colors.slate50}>
                <Text color={Colors.slate400}>Finished:&nbsp;</Text>
                {formatExecutionDate(new Date(data?.endTime!))}
              </Text>
            )}
            <Text color={Colors.slate50}>
              {isRunning ? (
                'Running...'
              ) : (
                <>
                  <Text color={Colors.slate400}>Execution time:&nbsp;</Text>
                  {formatDuration((Date.parse(data!.endTime!) - Date.parse(data!.startTime!)) / 1000)}
                </>
              )}
            </Text>
          </ItemColumn>
        </ItemRow>
      </HeaderContent>
    </DrawerHeader>
  );
};

export default ExecutionDrawerHeader;
