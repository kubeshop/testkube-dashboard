import {FC, PropsWithChildren, useEffect, useMemo} from 'react';
import {useAsync, useInterval} from 'react-use';
import useWebSocket from 'react-use-websocket';

import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {QueryDefinition} from '@reduxjs/toolkit/query';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {Entity} from '@models/entity';
import {ExecutionMetrics} from '@models/metrics';
import {Test} from '@models/test';
import {TestSuiteExecution} from '@models/testSuiteExecution';
import {WSDataWithTestExecution, WSDataWithTestSuiteExecution, WSEventType} from '@models/websocket';

import {useRouterPlugin} from '@plugins/router/hooks';

import {useWsEndpoint} from '@services/apiEndpoint';

import {
  useEntityDetailsField,
  useEntityDetailsInstance,
  useEntityDetailsPick,
  useEntityDetailsReset,
  useEntityDetailsSync,
} from '@store/entityDetails';

import {safeRefetch} from '@utils/fetchUtils';
import {PollingIntervals} from '@utils/numbers';
import {getRtkIdToken} from '@utils/rtk';
import {convertTestSuiteV2ExecutionToV3, isTestSuiteV2} from '@utils/testSuites';

interface EntityDetailsLayerProps {
  entity: Entity;
  id: string;
  execId?: string;
  useGetEntityDetails: UseQuery<QueryDefinition<any, any, any, any, any>>;
  useGetMetrics: UseQuery<QueryDefinition<any, any, any, any, any>>;
  useGetExecutions: UseQuery<QueryDefinition<any, any, any, any, any>>;
}

const EntityDetailsLayer: FC<PropsWithChildren<EntityDetailsLayerProps>> = ({
  entity,
  id,
  execId,
  useGetEntityDetails,
  useGetMetrics,
  useGetExecutions,
  children,
}) => {
  const {navigate} = useRouterPlugin.pick('navigate');

  useEntityDetailsReset({entity, id}, [entity, id, navigate, useGetEntityDetails]);

  const [metrics, setMetrics] = useEntityDetailsField('metrics');
  const [, setCurrentPage] = useEntityDetailsField('currentPage');
  const [executions, setExecutions] = useEntityDetailsField('executions');
  const [, setExecutionsLoading] = useEntityDetailsField('executionsLoading');
  const [, setIsFirstTimeLoading] = useEntityDetailsField('isFirstTimeLoading');
  const [daysFilterValue, setDaysFilterValue] = useEntityDetailsField('daysFilterValue');
  const {executionsFilters} = useEntityDetailsPick('executionsFilters');

  const isClusterAvailable = useSystemAccess(SystemAccess.agent);
  const isSystemAvailable = useSystemAccess(SystemAccess.system);
  const wsRoot = useWsEndpoint();

  const {
    data: rawExecutions,
    isFetching,
    refetch,
  } = useGetExecutions(
    {id, last: daysFilterValue, ...executionsFilters},
    {
      pollingInterval: PollingIntervals.long,
      skip: !isSystemAvailable,
    }
  );

  const {data: rawMetrics, refetch: refetchMetrics} = useGetMetrics(
    {id, last: daysFilterValue},
    {skip: !isSystemAvailable}
  );
  const {data: rawDetails, error} = useGetEntityDetails(id, {
    pollingInterval: PollingIntervals.long,
    skip: !isSystemAvailable,
  });

  const isV2 = isTestSuiteV2(rawDetails);
  const details = useMemo(() => (isV2 ? convertTestSuiteV2ExecutionToV3(rawDetails) : rawDetails), [isV2, rawDetails]);

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
    !tokenLoading && isClusterAvailable
  );

  useEffect(() => {
    setExecutionsLoading(isFetching);
  }, [isFetching, setExecutionsLoading]);

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
  }, [useEntityDetailsInstance(), rawExecutions]);

  useEffect(() => {
    setMetrics(rawMetrics);
  }, [useEntityDetailsInstance(), rawMetrics]);

  useEntityDetailsSync({details, isV2, error});

  return <>{children}</>;
};

export default EntityDetailsLayer;
