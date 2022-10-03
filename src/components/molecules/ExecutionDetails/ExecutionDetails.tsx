/* eslint-disable unused-imports/no-unused-imports-ts */
import React, {useContext, useEffect, useState} from 'react';

import {CloseOutlined} from '@ant-design/icons';

import {intervalToDuration} from 'date-fns';

import {Entity} from '@models/entity';

import {StatusIcon} from '@atoms';

import {Button, Modal, Text} from '@custom-antd';

import {DrawerHeader} from '@organisms/EntityDetails/ExecutionDetailsDrawer/ExecutionDetailsDrawer.styled';

import useIsRunning from '@hooks/useIsRunning';

import {constructExecutedString, formatExecutionDate} from '@utils/formatDate';
import {PollingIntervals} from '@utils/numbers';

import {useGetTestSuiteExecutionByIdQuery} from '@services/testSuiteExecutions';
import {useGetTestExecutionByIdQuery} from '@services/tests';

import Colors from '@styles/Colors';

import {EntityDetailsContext, ExecutionDetailsContext} from '@contexts';
import {ExecutionDetailsOnDataChangeInterface} from '@contexts/ExecutionDetailsContext';

import {DetailsWrapper} from '../EntityGrid/EntityGrid.styled';
import {ItemColumn, ItemRow} from './ExecutionDetails.styled';
import TestExecutionDetailsTabs from './TestExecutionDetails/TestExecutionDetailsTabs';
import TestSuiteExecutionDetailsTabs from './TestSuiteExecutionDetails/TestSuiteExecutionDetailsTabs';
import {getHeaderValues} from './utils';
import { AbortExecutionModalConfig } from './AbortExecution/utils';

const TestSuiteExecutionDetailsDataLayer: React.FC = () => {
  const {onDataChange} = useContext(ExecutionDetailsContext);
  const {execId} = useContext(EntityDetailsContext);

  // @ts-ignore
  // we have checked if execId exists on <ExecutionDetails /> below
  const {data, isLoading, isFetching, refetch} = useGetTestSuiteExecutionByIdQuery(execId, {
    pollingInterval: PollingIntervals.everySecond,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const TestExecutionDetailsDataLayer: React.FC = () => {
  const {onDataChange} = useContext(ExecutionDetailsContext);
  const {execId} = useContext(EntityDetailsContext);

  // @ts-ignore
  // we have checked if execId exists on <ExecutionDetails /> below
  const {data, isLoading, isFetching, refetch} = useGetTestExecutionByIdQuery(execId, {
    pollingInterval: PollingIntervals.everySecond,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const dataLayers: {[key in Entity]: any} = {
  'test-suites': <TestSuiteExecutionDetailsDataLayer />,
  tests: <TestExecutionDetailsDataLayer />,
};

const components: {[key in Entity]: any} = {
  'test-suites': <TestSuiteExecutionDetailsTabs />,
  tests: <TestExecutionDetailsTabs />,
};

const ExecutionDetails: React.FC = () => {
  const {entity, execId, unselectRow} = useContext(EntityDetailsContext);

  const [infoPanelProps, setInfoPanelProps] = useState<ExecutionDetailsOnDataChangeInterface>({
    data: null,
    isLoading: false,
    isFetching: false,
    refetch: () => {},
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onConfirm = () => {
    setIsModalVisible(true);
  };
  const {data, isLoading, isFetching, refetch} = infoPanelProps;

  // @ts-ignore
  const status = data?.executionResult?.status || data?.status;

  const isRunning = useIsRunning(status);

  const onDataChange = (args: ExecutionDetailsOnDataChangeInterface) => {
    setInfoPanelProps(args);
  };

  if (!execId) {
    return <></>;
  }

  const headerValues = getHeaderValues(entity, data);

  const {name, number, startedTime, finishedTime} = headerValues;

  const getDuration = () => {
    try {
      return constructExecutedString(intervalToDuration({start: startedTime, end: finishedTime}));
      // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  return (
    <ExecutionDetailsContext.Provider value={{onDataChange, data}}>
      {dataLayers[entity]}
      {data ? (
        <>
          <DrawerHeader>
            <StatusIcon status={status} />
            <DetailsWrapper>
              <ItemRow $flex={1}>
                <ItemColumn>
                  <Text className="biggest bold" ellipsis>
                    {name}
                  </Text>
                </ItemColumn>
                <ItemColumn className="flex-auto">
                  <CloseOutlined onClick={unselectRow} style={{color: Colors.slate400, fontSize: 20}} />
                </ItemColumn>
              </ItemRow>
              <ItemRow $flex={1}>
                <ItemColumn>
                  {number ? (
                    <Text className="regular small" color={Colors.slate400}>
                      #{number}
                    </Text>
                  ) : null}
                  <Text className="regular small" color={Colors.slate400}>
                    manual
                  </Text>
                  <Text className="regular small" color={Colors.slate400}>
                    Started: {formatExecutionDate(startedTime)}
                  </Text>
                  <Text className="regular small" color={Colors.slate400}>
                    Finished: {isRunning ? 'running' : formatExecutionDate(finishedTime)}
                  </Text>

                  <Text className="regular small" color={Colors.slate400}>
                    {isRunning ? '' : getDuration()}
                  </Text>
                </ItemColumn>
              </ItemRow>
            </DetailsWrapper>
          </DrawerHeader>
          {components[entity]}
          <br />
          <Button $customType='warning' hidden = {status !== 'running'} onClick={onConfirm}>
              Abort Execution
            </Button>
            {isModalVisible ? (
        <Modal {...AbortExecutionModalConfig} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
      ) : null}
        </>
      ) : null}
    </ExecutionDetailsContext.Provider>
  );
};

export default ExecutionDetails;
