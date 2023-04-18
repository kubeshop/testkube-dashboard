import React, {useContext, useMemo} from 'react';

import {Dropdown, Menu} from 'antd';

import {CloseOutlined} from '@ant-design/icons';

import {intervalToDuration} from 'date-fns';

import {Dots, StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import useIsRunning from '@hooks/useIsRunning';

import {constructExecutedString, formatExecutionDate} from '@utils/formatDate';

import Colors from '@styles/Colors';

import {EntityDetailsContext} from '@contexts';

import {DrawerHeader, HeaderContent, ItemColumn, ItemRow} from './ExecutionDetailsDrawer.styled';
import {getHeaderValues} from './utils';

type ExecutionDetailsDrawerHeaderProps = {
  data: any;
};

const ExecutionDetailsDrawerHeader: React.FC<ExecutionDetailsDrawerHeaderProps> = props => {
  const {unselectRow, entity, execId, abortExecution} = useContext(EntityDetailsContext);

  const {data} = props;
  // @ts-ignore
  const status = data?.executionResult?.status || data?.status;

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

  const menu = <Menu items={renderedExecutionActions} />;

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
            {renderedExecutionActions && renderedExecutionActions.length ? (
              <div
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <Dropdown overlay={menu} placement="bottom">
                  <div style={{width: 20}}>
                    <Dots color={Colors.grey450} />
                  </div>
                </Dropdown>
              </div>
            ) : null}
            <CloseOutlined onClick={unselectRow} style={{color: Colors.slate400, fontSize: 20}} />
          </ItemColumn>
        </ItemRow>
        <ItemRow $flex={1}>
          <ItemColumn>
            {number ? <Text color={Colors.slate50}>#{number}</Text> : null}
            <Text color={Colors.slate50}>
              <Text color={Colors.slate400}>Trigger:&nbsp;</Text>
              manual
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
