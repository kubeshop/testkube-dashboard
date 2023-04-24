import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import {useAsync} from 'react-use';

import {EntityDetailsBlueprint} from '@models/entityDetails';
import {ExecutionMetrics, Metrics} from '@models/metrics';
import {WSData, WSEventType} from '@models/websocket';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import useStateCallback from '@hooks/useStateCallback';

import {useWsEndpoint} from '@services/apiEndpoint';

import {getRtkIdToken, safeRefetch} from '@utils/fetchUtils';
import {PollingIntervals} from '@utils/numbers';

import {EntityDetailsContext, MainContext} from '@contexts';

import EntityDetailsContent from '../EntityDetailsContent';
import ExecutionDetailsDrawer from '../ExecutionDetailsDrawer';
import {EntityDetailsWrapper} from './EntityDetailsContainer.styled';

const EntityDetailsContainer: React.FC<EntityDetailsBlueprint> = props => {
  const {entity, useGetEntityDetails, useGetMetrics, defaultStackRoute, useGetExecutions, useAbortExecution} = props;

  const {navigate, location, isClusterAvailable} = useContext(MainContext);
  const {daysFilterValue: defaultDaysFilterValue, currentPage: defaultCurrentPage} = useContext(EntityDetailsContext);
  const wsRoot = useWsEndpoint();

  const {pathname} = location;

  const params = useParams();
  const {id, execId = ''} = params;

  const [daysFilterValue, setDaysFilterValue] = useState(defaultDaysFilterValue);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const [selectedRow, selectRow] = useState();
  const [executionsList, setExecutionsList] = useStateCallback<any>(null);
  const [metricsState, setMetricsState] = useState<Metrics | undefined>(undefined);
  const [isFirstTimeLoading, setFirstTimeLoading] = useState(true);

  const executors = useAppSelector(selectExecutors);

  const {data: executions, refetch} = useGetExecutions(
    {id, last: daysFilterValue},
    {pollingInterval: PollingIntervals.long, skip: !isClusterAvailable}
  );
  const {data: entityDetails} = useGetEntityDetails(id, {
    pollingInterval: PollingIntervals.everyTwoSeconds,
    skip: !isClusterAvailable,
  });
  const {data: metrics, refetch: refetchMetrics} = useGetMetrics({id, last: daysFilterValue, skip: !isClusterAvailable});
  const [abortExecution] = useAbortExecution();

  const onWebSocketData = (wsData: WSData) => {
    try {
      if (executionsList) {
        if (wsData.type === WSEventType.START_TEST && id === wsData.testExecution.testName) {
          const adjustedExecution = {
            ...wsData.testExecution,
            status: wsData.testExecution.executionResult.status,
          };

          const metricToPush: ExecutionMetrics = {
            name: wsData.testExecution.testName,
            startTime: wsData.testExecution.startTime,
            status: wsData.testExecution.executionResult.status,
          };

          setMetricsState(prev => {
            if (prev) {
              return {...prev, executions: [metricToPush, ...((prev.executions && prev.executions) || [])]};
            }
          });

          setExecutionsList(
            {
              ...executionsList,
              results: [adjustedExecution, ...executionsList.results],
            },
            () => {
              safeRefetch(refetchMetrics);
            }
          );
        }

        if (wsData.type === WSEventType.END_TEST_SUCCESS && id === wsData.testExecution.testName) {
          const targetIndex = executionsList.results.findIndex((item: any) => {
            return item.id === wsData.testExecution.id;
          });

          if (targetIndex !== -1) {
            setExecutionsList(
              {
                ...executionsList,
                results: executionsList.results.map((item: any, index: number) => {
                  if (index === targetIndex) {
                    return {...item, ...wsData.testExecution, status: wsData.testExecution.executionResult.status};
                  }

                  return item;
                }),
              },
              () => {
                safeRefetch(refetchMetrics);
              }
            );
          }
        }

        if (
          wsData.type === WSEventType.END_TEST_ABORT ||
          wsData.type === WSEventType.END_TEST_TIMEOUT ||
          wsData.type === WSEventType.END_TEST_FAILED ||
          wsData.type === WSEventType.END_TEST_SUITE_ABORT ||
          wsData.type === WSEventType.END_TEST_SUITE_TIMEOUT ||
          wsData.type === WSEventType.END_TEST_SUITE_FAILED
        ) {
          safeRefetch(refetch);
          safeRefetch(refetchMetrics);
        }

        if (wsData.type === WSEventType.START_TEST_SUITE && id === wsData.testSuiteExecution.testSuite.name) {
          const adjustedExecution = {
            ...wsData.testSuiteExecution,
            status: wsData.testSuiteExecution.status,
          };

          setExecutionsList(
            {
              ...executionsList,
              results: [adjustedExecution, ...executionsList.results],
            },
            () => {
              safeRefetch(refetchMetrics);
            }
          );
        }

        if (wsData.type === WSEventType.END_TEST_SUITE_SUCCESS && id === wsData.testSuiteExecution.testSuite.name) {
          const targetIndex = executionsList.results.findIndex((item: any) => {
            return item.id === wsData.testSuiteExecution.id;
          });

          if (targetIndex !== -1) {
            setExecutionsList(
              {
                ...executionsList,
                results: executionsList.results.map((item: any, index: number) => {
                  if (index === targetIndex) {
                    return {...item, ...wsData.testSuiteExecution, status: wsData.testSuiteExecution.status};
                  }

                  return item;
                }),
              },
              () => {
                safeRefetch(refetchMetrics);
              }
            );
          }
        }
      }
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log('err: ', err);
    }
  };

  // TODO: Consider getting token different way than using the one from RTK
  const {value: token, loading: tokenLoading} = useAsync(getRtkIdToken);
  useWebSocket(`${wsRoot}/events/stream`, {
    onMessage: event => {
      const wsData = JSON.parse(event.data) as WSData;

      onWebSocketData(wsData);
    },
    shouldReconnect: () => true,
    retryOnError: true,
    queryParams: token ? {token} : {},
  }, !tokenLoading);

  const defaultUrl = `/${entity}/executions/${entityDetails?.name}`;

  const onRowSelect = (dataItem: any, isManual?: boolean) => {
    selectRow(dataItem);

    if (isManual) {
      navigate(`${defaultUrl}/execution/${dataItem?.id}`);
    }
  };

  const unselectRow = () => {
    selectRow(undefined);
    navigate(defaultUrl);
  };

  useEffect(() => {
    setMetricsState(metrics);
  }, [metrics]);

  useEffect(() => {
    if (params.execId && executionsList?.results.length > 0) {
      const executionDetails = executionsList?.results?.find((execution: any) => execution.id === execId);
      const indexOfDisplayedExecution = executionDetails ? executionsList.results?.indexOf(executionDetails) + 1 : null;
      indexOfDisplayedExecution ? setCurrentPage(Math.ceil(indexOfDisplayedExecution / 10)) : setDaysFilterValue(0);
    }
  }, [params, executionsList]);

  useEffect(() => {
    if (params.execId) {
      onRowSelect({id: execId}, false);
    }
  }, [params]);

  useEffect(() => {
    safeRefetch(refetch);

    const interval = setInterval(() => {
      safeRefetch(refetchMetrics);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [entity, daysFilterValue]);

  useEffect(() => {
    setTimeout(() => {
      setFirstTimeLoading(false);
    }, 2000);

    setExecutionsList(executions);
  }, [executions]);

  const testIcon = entity === 'tests' ? getTestExecutorIcon(executors, entityDetails?.type) : undefined;

  const entityDetailsContextValues = {
    executionsList,
    entityDetails: {
      ...entityDetails,
      ...(testIcon ? {testIcon} : {}),
    },
    entity,
    onRowSelect,
    isRowSelected: Boolean(selectedRow),
    selectedRow,
    selectRow,
    unselectRow,
    id,
    execId,
    defaultStackRoute,
    setCurrentPage,
    currentPage,
    metrics: metricsState,
    daysFilterValue,
    setDaysFilterValue,
    abortExecution,
    isFirstTimeLoading,
    setFirstTimeLoading,
  };

  return (
    <EntityDetailsContext.Provider value={entityDetailsContextValues}>
      <EntityDetailsWrapper>
        <EntityDetailsContent />
        <ExecutionDetailsDrawer />
      </EntityDetailsWrapper>
    </EntityDetailsContext.Provider>
  );
};

export default EntityDetailsContainer;
