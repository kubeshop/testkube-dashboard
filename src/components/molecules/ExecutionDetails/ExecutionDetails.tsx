/* eslint-disable unused-imports/no-unused-imports-ts */
import React, {useContext, useEffect, useMemo, useState} from 'react';

import {Dropdown, Menu} from 'antd';

import {CloseOutlined} from '@ant-design/icons';

import {intervalToDuration} from 'date-fns';

import {Entity} from '@models/entity';

import {Dots, StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

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
  const {entity, execId, unselectRow, abortTestExecution} = useContext(EntityDetailsContext);

  const [infoPanelProps, setInfoPanelProps] = useState<ExecutionDetailsOnDataChangeInterface>({
    data: null,
    isLoading: false,
    isFetching: false,
    refetch: () => {},
  });

  const {data} = infoPanelProps;

  // @ts-ignore
  const status = data?.executionResult?.status || data?.status;

  const isRunning = useIsRunning(status);

  const headerValues = getHeaderValues(entity, data);

  const {name, number, startedTime, finishedTime, id} = headerValues;

  const onAbortTestExecution = () => {
    if (id && execId) {
      abortTestExecution({executionId: execId, testId: id});
    }
  };

  const renderExecutionActions = () => {
    let actionsArray = [];

    if (isRunning) {
      actionsArray.push({key: 1, label: <span onClick={onAbortTestExecution}>Abort execution</span>});
    }

    return actionsArray;
  };

  const renderedExecutionActions = useMemo(() => {
    return renderExecutionActions();
  }, [isRunning]);

  const menu = <Menu items={renderedExecutionActions} />;

  if (!execId) {
    return <></>;
  }

  const onDataChange = (args: ExecutionDetailsOnDataChangeInterface) => {
    setInfoPanelProps(args);
  };

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
        </>
      ) : null}
    </ExecutionDetailsContext.Provider>
  );
};

export default ExecutionDetails;
