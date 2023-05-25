import React, {useContext, useMemo} from 'react';

import {CloseOutlined} from '@ant-design/icons';

import {intervalToDuration} from 'date-fns';

import {StatusIcon} from '@atoms';

import {EntityDetailsContext} from '@contexts';

import {Text} from '@custom-antd';

import useIsRunning from '@hooks/useIsRunning';

import {DotsDropdown, RunningContext} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import Colors from '@styles/Colors';

import {constructExecutedString, formatExecutionDate} from '@utils/formatDate';

import {DrawerHeader, HeaderContent, ItemColumn, ItemRow} from './ExecutionDetailsDrawer.styled';
import {getHeaderValues} from './utils';

type ExecutionDetailsDrawerHeaderProps = {
  data: any;
};

const ExecutionDetailsDrawerHeader: React.FC<ExecutionDetailsDrawerHeaderProps> = props => {
  const {unselectRow, entity, execId, abortExecution} = useContext(EntityDetailsContext);
  const mayManageExecution = usePermission(Permissions.manageEntityExecution);

  const {data} = props;
  // @ts-ignore
  const status = data?.executionResult?.status || data?.status;
  const runningContext = data?.runningContext;

  const isRunning = useIsRunning(status);

  const headerValues = getHeaderValues(entity, data);

  const {name, number, startedTime, finishedTime, id} = headerValues;

  const onAbortExecution = () => {
    if (id && execId) {
      abortExecution({executionId: execId, id});
    }
  };

  const getDuration = () => {
    try {
      return constructExecutedString(intervalToDuration({start: startedTime, end: finishedTime}));
      // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  const renderExecutionActions = () => {
    let actionsArray = [];

    if (isRunning) {
      actionsArray.push({key: 1, label: <span onClick={onAbortExecution}>Abort execution</span>});
    }

    return actionsArray;
  };

  const renderedExecutionActions = useMemo(() => {
    return renderExecutionActions();
  }, [isRunning]);

  return (
    <DrawerHeader>
      <div style={{marginTop: '5px'}}>
        <StatusIcon status={status} />
      </div>
      <HeaderContent>
        <ItemRow $flex={1}>
          <ItemColumn>
            <Text className="biggest bold" ellipsis title={name}>
              {name}
            </Text>
          </ItemColumn>
          <ItemColumn className="flex-auto">
            {renderedExecutionActions && renderedExecutionActions.length && mayManageExecution ? (
              <DotsDropdown items={renderedExecutionActions} />
            ) : null}
            <CloseOutlined onClick={unselectRow} style={{color: Colors.slate400, fontSize: 20}} />
          </ItemColumn>
        </ItemRow>
        <ItemRow $flex={1}>
          <ItemColumn>
            {number ? <Text color={Colors.slate50}>#{number}</Text> : null}
            <Text ellipsis>
              <Text color={Colors.slate400}>Trigger:&nbsp;</Text>
              <RunningContext
                type={runningContext?.type}
                context={runningContext?.context}
                unselectRow={unselectRow}
                entity={entity}
              />
            </Text>
            <Text color={Colors.slate50}>
              <Text color={Colors.slate400}>Started:&nbsp;</Text>
              {formatExecutionDate(startedTime)}
            </Text>
            <Text color={Colors.slate50}>
              <Text color={Colors.slate400}>Finished:&nbsp;</Text>
              {isRunning ? 'running' : formatExecutionDate(finishedTime)}
            </Text>
            <Text color={Colors.slate50}>
              {isRunning ? (
                'Running...'
              ) : (
                <>
                  <Text color={Colors.slate400}>Execution time:&nbsp;</Text>
                  {getDuration()}
                </>
              )}
            </Text>
          </ItemColumn>
        </ItemRow>
      </HeaderContent>
    </DrawerHeader>
  );
};

export default ExecutionDetailsDrawerHeader;
