import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

import axios from 'axios';

import {EntityDetailsBlueprint} from '@models/entityDetails';
import {WSData, WSEventType} from '@models/websocket';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import useStateCallback from '@hooks/useStateCallback';

import {useWsEndpoint} from '@services/apiEndpoint';

import {safeRefetch} from '@utils/fetchUtils';
import {PollingIntervals} from '@utils/numbers';

import {EntityDetailsContext, MainContext} from '@contexts';

import EntityDetailsContent from '../EntityDetailsContent';
import ExecutionDetailsDrawer from '../ExecutionDetailsDrawer';
import {EntityDetailsWrapper} from './EntityDetailsContainer.styled';

const EntityDetailsContainer: React.FC<EntityDetailsBlueprint> = props => {
  const {
    entity,
    useGetEntityDetails,
    useGetMetrics,
    defaultStackRoute,
    getExecutionsEndpoint,
    useGetExecutions,
    useAbortExecution,
  } = props;

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
  const [isFirstTimeLoading, setFirstTimeLoading] = useState(true);

  const executors = useAppSelector(selectExecutors);

  const {data: executions, refetch} = useGetExecutions(
    {id, last: daysFilterValue},
    {pollingInterval: PollingIntervals.long}
  );
  const {data: entityDetails} = useGetEntityDetails(id, {
    pollingInterval: PollingIntervals.everyTwoSeconds,
    skip: !isClusterAvailable,
  });
  const {data: metrics, refetch: refetchMetrics} = useGetMetrics({id, last: daysFilterValue, skip: !isClusterAvailable});
  const [abortExecution] = useAbortExecution();

  // Temporary solution until WS implementation
  // works stable on both FE and BE
  const getExecutions = async () => {
    if (id) {
      try {
        const queryParams = new URLSearchParams({
          id,
          last: String(daysFilterValue),
          pageSize: String(Number.MAX_SAFE_INTEGER),
        });

        const endpoint =
          typeof getExecutionsEndpoint === 'function' ? getExecutionsEndpoint(id) : getExecutionsEndpoint;

        const {data} = await axios(`${endpoint}?${queryParams.toString()}`, {
          method: 'GET',
        });

        setExecutionsList(data);
      } catch (err) {
        //
      }
    }
  };

  const onWebSocketData = (wsData: WSData) => {
    try {
      if (executionsList) {
        if (wsData.type === WSEventType.START_TEST && id === wsData.testExecution.testName) {
          const adjustedExecution = {
            ...wsData.testExecution,
            status: wsData.testExecution.executionResult.status,
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

        if (wsData.type === WSEventType.END_TEST_ABORT || wsData.type === WSEventType.END_TEST_TIMEOUT) {
          safeRefetch(refetch);
          safeRefetch(refetchMetrics);
        }
      }
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log('err: ', err);
    }
  };

  useWebSocket(`${wsRoot}/events/stream`, {
    onMessage: event => {
      const wsData = JSON.parse(event.data) as WSData;

      onWebSocketData(wsData);
    },
  });

  const getDefaultUrl = () => {
    const clarifyTargetUrl = pathname.split('/').slice(0, 4);

    return clarifyTargetUrl.join('/');
  };

  const onRowSelect = (dataItem: any, isManual?: boolean) => {
    selectRow(dataItem);

    if (isManual) {
      if (execId) {
        const defaultUrl = getDefaultUrl();

        const targetUrl = `${defaultUrl}/execution/${dataItem?.id}`;

        navigate(targetUrl);
      } else {
        const targetUrl = `${pathname}/execution/${dataItem?.id}`;

        navigate(targetUrl);
      }
    } else if (!execId) {
      const targetUrl = `${pathname}/execution/${dataItem?.id}`;

      navigate(targetUrl);
    }
  };

  const unselectRow = () => {
    selectRow(undefined);

    const defaultUrl = getDefaultUrl();

    navigate(defaultUrl);
  };

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

    if (entity === 'test-suites') {
      const interval = setInterval(() => {
        getExecutions();
        safeRefetch(refetchMetrics);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }

    const interval = setInterval(() => {
      safeRefetch(refetchMetrics);
    }, 10000);

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
    metrics,
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
