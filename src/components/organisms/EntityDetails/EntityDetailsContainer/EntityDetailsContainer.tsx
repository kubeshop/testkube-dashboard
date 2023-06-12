import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAsync, useInterval} from 'react-use';
import useWebSocket from 'react-use-websocket';

import {DashboardContext, EntityDetailsContext, MainContext} from '@contexts';

import useExecutorIcon from '@hooks/useExecutorIcon';
import useStateCallback from '@hooks/useStateCallback';

import {EntityDetailsBlueprint} from '@models/entityDetails';
import {ExecutionMetrics, Metrics} from '@models/metrics';
import {Test} from '@models/test';
import {TestSuiteExecution} from '@models/testSuiteExecution';
import {WSDataWithTestExecution, WSDataWithTestSuiteExecution, WSEventType} from '@models/websocket';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';

import {useWsEndpoint} from '@services/apiEndpoint';

import {getRtkIdToken, safeRefetch} from '@utils/fetchUtils';
import {PollingIntervals} from '@utils/numbers';

import EntityDetailsContent from '../EntityDetailsContent';
import ExecutionDetailsDrawer from '../ExecutionDetailsDrawer';

import {EntityDetailsWrapper} from './EntityDetailsContainer.styled';

const EntityDetailsContainer: React.FC<EntityDetailsBlueprint> = props => {
  const {
    entity,
    useGetEntityDetails,
    useGetMetrics,
    defaultStackRoute,
    useGetExecutions,
    useAbortExecution,
    useAbortAllExecutions,
  } = props;

  const {isClusterAvailable} = useContext(MainContext);
  const {navigate} = useContext(DashboardContext);
  const {daysFilterValue: defaultDaysFilterValue, currentPage: defaultCurrentPage} = useContext(EntityDetailsContext);
  const wsRoot = useWsEndpoint();

  const {id, execId} = useParams();

  const [daysFilterValue, setDaysFilterValue] = useState(defaultDaysFilterValue);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const [selectedRow, selectRow] = useState<string | undefined>();
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
  const {data: metrics, refetch: refetchMetrics} = useGetMetrics({
    id,
    last: daysFilterValue,
    skip: !isClusterAvailable,
  });
  const [abortExecution] = useAbortExecution();
  const [abortAllExecutions] = useAbortAllExecutions();

  const onWebSocketData = (wsData: WSDataWithTestExecution | WSDataWithTestSuiteExecution) => {
    try {
      if (executionsList) {
        if ('testExecution' in wsData) {
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
                  results: executionsList.results.map((item: Test, index: number) => {
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
        } else {
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
            const targetIndex = executionsList.results.findIndex((item: TestSuiteExecution) => {
              return item.id === wsData.testSuiteExecution.id;
            });

            if (targetIndex !== -1) {
              setExecutionsList(
                {
                  ...executionsList,
                  results: executionsList.results.map((item: TestSuiteExecution, index: number) => {
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
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err: ', err);
    }
  };

  // TODO: Consider getting token different way than using the one from RTK
  const {value: token, loading: tokenLoading} = useAsync(getRtkIdToken);
  useWebSocket(
    `${wsRoot}/events/stream`,
    {
      onMessage: event => {
        const wsData = JSON.parse(event.data) as WSDataWithTestExecution | WSDataWithTestSuiteExecution;

        onWebSocketData(wsData);
      },
      shouldReconnect: () => true,
      retryOnError: true,
      queryParams: token ? {token} : {},
    },
    !tokenLoading
  );

  const defaultUrl = `/${entity}/executions/${entityDetails?.name}`;

  const onRowSelect = useCallback(
    (dataItem: any) => {
      navigate(`${defaultUrl}/execution/${dataItem?.id}`);
    },
    [navigate, defaultUrl]
  );

  const unselectRow = useCallback(() => {
    navigate(defaultUrl);
  }, [selectRow, navigate, defaultUrl]);

  useEffect(() => {
    setMetricsState(metrics);
  }, [metrics]);

  useEffect(() => {
    if (execId && executionsList?.results.length > 0) {
      const executionDetails = executionsList?.results?.find((execution: any) => execution.id === execId);
      const indexOfDisplayedExecution = executionDetails ? executionsList.results?.indexOf(executionDetails) + 1 : null;
      if (indexOfDisplayedExecution) {
        setCurrentPage(Math.ceil(indexOfDisplayedExecution / 10));
      } else {
        setDaysFilterValue(0);
      }
    }
  }, [execId, executionsList]);

  useEffect(() => {
    if (execId) {
      selectRow(execId);
    }
  }, [execId]);

  useEffect(() => {
    safeRefetch(refetch);
  }, [entity, daysFilterValue]);

  useInterval(() => safeRefetch(refetchMetrics), 2000);

  useEffect(() => {
    setFirstTimeLoading(true);
  }, [id]);

  useEffect(() => {
    if (executions) {
      setFirstTimeLoading(false);
    }
    setExecutionsList(executions);
  }, [executions]);

  const testIcon = useExecutorIcon(entityDetails);

  const entityDetailsWithIcon = useMemo(
    () => ({
      ...entityDetails,
      ...(testIcon ? {testIcon} : {}),
    }),
    [entityDetails, testIcon]
  );

  const entityDetailsContextValues = {
    executionsList,
    entityDetails: entityDetailsWithIcon,
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
    abortAllExecutions,
    isFirstTimeLoading,
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
