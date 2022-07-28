/* eslint-disable unused-imports/no-unused-imports-ts */
import React, {useContext, useEffect, useState} from 'react';

import {CloseOutlined} from '@ant-design/icons';

import {intervalToDuration} from 'date-fns';

import {Entity} from '@models/entity';

import {StatusIcon} from '@atoms';

import {Text, Title} from '@custom-antd';

import useIsRunning from '@hooks/useIsRunning';

import {constructExecutedString, formatExecutionDate} from '@utils/formatDate';
import {PollingIntervals} from '@utils/numbers';

import {useGetTestSuiteExecutionByIdQuery} from '@services/testSuiteExecutions';
import {useGetTestExecutionByIdQuery} from '@services/tests';

import Colors from '@styles/Colors';

import {EntityExecutionsContext, ExecutionDetailsContext} from '@contexts';

import {DrawerHeader} from '@src/components/organisms/EntityExecutions/ExecutionDetailsDrawer/ExecutionDetailsDrawer.styled';
import {ExecutionDetailsOnDataChangeInterface} from '@src/contexts/ExecutionDetailsContext';

import {DetailsWrapper, ItemColumn, ItemRow} from '../EntityGrid/EntityGrid.styled';
import TestExecutionDetailsTabs from './TestExecutionDetails/TestExecutionDetailsTabs';
import TestSuiteExecutionDetailsTabs from './TestSuiteExecutionDetails/TestSuiteExecutionDetailsTabs';
import {getHeaderValues} from './utils';

const TestSuiteExecutionDetailsDataLayer: React.FC = () => {
  const {onDataChange} = useContext(ExecutionDetailsContext);
  const {execId} = useContext(EntityExecutionsContext);

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
  const {execId} = useContext(EntityExecutionsContext);

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
  'test-suites': null, // <TestSuiteExecutionDetailsTabs />,
  tests: <TestExecutionDetailsTabs />,
};

const ExecutionDetails: React.FC = () => {
  const {entity, execId, unselectRow} = useContext(EntityExecutionsContext);

  const [infoPanelProps, setInfoPanelProps] = useState<ExecutionDetailsOnDataChangeInterface>({
    data: null,
    isLoading: false,
    isFetching: false,
    refetch: () => {},
  });

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
                  <Title ellipsis>{name}</Title>
                </ItemColumn>
                <ItemColumn>
                  <CloseOutlined onClick={unselectRow} style={{color: Colors.slate400}} />
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
                    {isRunning
                      ? ''
                      : constructExecutedString(intervalToDuration({start: startedTime, end: finishedTime}))}
                  </Text>
                </ItemColumn>
              </ItemRow>
            </DetailsWrapper>
          </DrawerHeader>
          {components[entity]}
        </>
      ) : null}
    </ExecutionDetailsContext.Provider>
  );
};

export default ExecutionDetails;
