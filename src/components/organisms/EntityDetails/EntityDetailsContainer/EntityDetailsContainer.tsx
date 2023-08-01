import React, {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAsync, useInterval} from 'react-use';
import useWebSocket from 'react-use-websocket';

import {useEntityDetailsConfig} from '@constants/entityDetailsConfig/useEntityDetailsConfig';

import {DashboardContext, MainContext} from '@contexts';

import {useLastCallback} from '@hooks/useLastCallback';

import {Entity} from '@models/entity';
import {ExecutionMetrics} from '@models/metrics';
import {Test} from '@models/test';
import {TestSuiteExecution} from '@models/testSuiteExecution';
import {WSDataWithTestExecution, WSDataWithTestSuiteExecution, WSEventType} from '@models/websocket';

import {useWsEndpoint} from '@services/apiEndpoint';

import {initializeEntityDetailsStore} from '@store/entityDetails';
import {initializeExecutionDetailsStore} from '@store/executionDetails';

import {getRtkIdToken, safeRefetch} from '@utils/fetchUtils';
import {PollingIntervals} from '@utils/numbers';

import EntityDetailsContent from '../EntityDetailsContent';
import ExecutionDetailsDrawer from '../ExecutionDetailsDrawer';

import {EntityDetailsWrapper} from './EntityDetailsContainer.styled';

const EntityDetailsContainer: React.FC<{entity: Entity}> = props => {
  const {entity} = props;
  const {useGetEntityDetails, useGetMetrics, useGetExecutions} = useEntityDetailsConfig(entity);

  const {id, execId} = useParams();

  const {navigate} = useContext(DashboardContext);

  const [ExecutionStoreProvider] = initializeExecutionDetailsStore(
    {
      id: execId,
      open: useLastCallback((targetId: string) => {
        navigate(`/${entity}/executions/${id}/execution/${targetId}`);
      }),
      close: useLastCallback(() => {
        navigate(`/${entity}/executions/${id}`);
      }),
    },
    [execId]
  );
  const [EntityStoreProvider, {sync: useEntityDetailsSync, useField: useEntityDetailsField}] =
    initializeEntityDetailsStore({entity, id}, [entity, id, navigate]);

  const [metrics, setMetrics] = useEntityDetailsField('metrics');
  const [, setCurrentPage] = useEntityDetailsField('currentPage');
  const [executions, setExecutions] = useEntityDetailsField('executions');
  const [, setIsFirstTimeLoading] = useEntityDetailsField('isFirstTimeLoading');
  const [daysFilterValue, setDaysFilterValue] = useEntityDetailsField('daysFilterValue');

  const {isClusterAvailable} = useContext(MainContext);
  const wsRoot = useWsEndpoint();

  const {data: rawExecutions, refetch} = useGetExecutions(
    {id, last: daysFilterValue},
    {pollingInterval: PollingIntervals.long, skip: !isClusterAvailable}
  );
  const {data: rawDetails} = useGetEntityDetails(id, {
    pollingInterval: PollingIntervals.everyTwoSeconds,
    skip: !isClusterAvailable,
  });
  const {data: rawMetrics, refetch: refetchMetrics} = useGetMetrics(
    {id, last: daysFilterValue},
    {skip: !isClusterAvailable}
  );

  const onWebSocketData = (wsData: WSDataWithTestExecution | WSDataWithTestSuiteExecution) => {
    try {
      if (executions) {
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

            setMetrics({
              ...metrics!,
              executions: [metricToPush, ...(metrics?.executions || [])],
            });

            setExecutions({
              ...executions,
              results: [adjustedExecution, ...executions.results],
            });
            safeRefetch(refetchMetrics);
          }

          if (wsData.type === WSEventType.END_TEST_SUCCESS && id === wsData.testExecution.testName) {
            const targetIndex = executions.results.findIndex((item: any) => {
              return item.id === wsData.testExecution.id;
            });

            if (targetIndex !== -1) {
              setExecutions({
                ...executions,
                results: executions.results.map((item: Test, index: number) => {
                  if (index === targetIndex) {
                    return {...item, ...wsData.testExecution, status: wsData.testExecution.executionResult.status};
                  }
                  return item;
                }),
              });
              safeRefetch(refetchMetrics);
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

            setExecutions({
              ...executions,
              results: [adjustedExecution, ...executions.results],
            });
            safeRefetch(refetchMetrics);
          }

          if (wsData.type === WSEventType.END_TEST_SUITE_SUCCESS && id === wsData.testSuiteExecution.testSuite.name) {
            const targetIndex = executions.results.findIndex((item: TestSuiteExecution) => {
              return item.id === wsData.testSuiteExecution.id;
            });

            if (targetIndex !== -1) {
              setExecutions({
                ...executions,
                results: executions.results.map((item: TestSuiteExecution, index: number) => {
                  if (index === targetIndex) {
                    return {...item, ...wsData.testSuiteExecution, status: wsData.testSuiteExecution.status};
                  }
                  return item;
                }),
              });
              safeRefetch(refetchMetrics);
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

  useEffect(() => {
    if (execId && executions?.results.length > 0) {
      const executionDetails = executions?.results?.find((execution: any) => execution.id === execId);
      const indexOfDisplayedExecution = executionDetails ? executions.results?.indexOf(executionDetails) + 1 : null;
      if (indexOfDisplayedExecution) {
        setCurrentPage(Math.ceil(indexOfDisplayedExecution / 10));
      } else {
        setDaysFilterValue(0);
      }
    }
  }, [execId, executions]);

  useEffect(() => {
    safeRefetch(refetch);
  }, [entity, daysFilterValue]);

  useInterval(() => safeRefetch(refetchMetrics), 2000);

  useEffect(() => {
    setIsFirstTimeLoading(true);
  }, [id]);

  useEffect(() => {
    if (rawExecutions) {
      setIsFirstTimeLoading(false);
    }
    setExecutions(rawExecutions);
  }, [useEntityDetailsSync, rawExecutions]);

  useEntityDetailsSync({
    metrics: rawMetrics,
    details: rawDetails,
  });

  return (
    <EntityStoreProvider>
      <ExecutionStoreProvider>
        <EntityDetailsWrapper>
          <EntityDetailsContent />
          <ExecutionDetailsDrawer />
        </EntityDetailsWrapper>
      </ExecutionStoreProvider>
    </EntityStoreProvider>
  );
};

export default EntityDetailsContainer;
