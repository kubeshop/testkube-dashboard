import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

import {notification} from 'antd';

import axios from 'axios';
import styled from 'styled-components';

import {EntityDetailsBlueprint} from '@models/entityDetails';
import {WSData, WSEventType} from '@models/websocket';

import useStateCallback from '@hooks/useStateCallback';

import {PollingIntervals} from '@utils/numbers';

import {useAbortTestExecutionMutation} from '@services/tests';

import {EntityDetailsContext, MainContext} from '@contexts';

import EntityDetailsContent from '../EntityDetailsContent';
import ExecutionDetailsDrawer from '../ExecutionDetailsDrawer';

const EntityDetailsContainer: React.FC<EntityDetailsBlueprint> = props => {
  const {entity, useGetEntityDetails, useGetMetrics, defaultStackRoute, getExecutionsEndpoint} = props;

  const [abortTestExecution] = useAbortTestExecutionMutation();

  const {navigate, location, wsRoot} = useContext(MainContext);
  const {pathname} = location;

  const params = useParams();
  const {id, execId} = params;

  const [daysFilterValue, setDaysFilterValue] = useState(7);
  const [selectedRow, selectRow] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [executionsList, setExecutionsList] = useStateCallback<any>(null);

  // const {data: executions, refetch} = useGetExecutions({id, last: daysFilterValue});
  const {data: entityDetails} = useGetEntityDetails(id, {
    pollingInterval: PollingIntervals.everyTwoSeconds,
  });
  const {data: metrics, refetch: refetchMetrics} = useGetMetrics({id, last: daysFilterValue});

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
              refetchMetrics();
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
                refetchMetrics();
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

        const targetUrl = `${defaultUrl}/execution/${dataItem.id}`;

        navigate(targetUrl);
      } else {
        const targetUrl = `${pathname}/execution/${dataItem.id}`;

        navigate(targetUrl);
      }
    } else if (!execId) {
      const targetUrl = `${pathname}/execution/${dataItem.id}`;

      navigate(targetUrl);
    }
  };

  const unselectRow = () => {
    selectRow(undefined);

    const defaultUrl = getDefaultUrl();

    navigate(defaultUrl);
  };

  useEffect(() => {
    if (execId && executionsList && executionsList?.results) {
      const neededExecution = executionsList?.results.filter((item: any) => {
        return item.id === execId;
      })[0];

      if (!neededExecution) {
        notification.error({message: 'Provided execution does not exist'});
        navigate(getDefaultUrl());
      } else {
        const targetEntity = executionsList.results?.filter((result: any) => {
          return result?.id === execId;
        });

        const targetEntityArrayIndex = executionsList.results?.indexOf(targetEntity[0]) + 1;

        onRowSelect(neededExecution, false);
        setCurrentPage(Math.ceil(targetEntityArrayIndex / 10));
      }
    } else {
      selectRow(undefined);
    }
  }, [executionsList, pathname]);

  useEffect(() => {
    if (entity === 'test-suites') {
      const interval = setInterval(() => {
        getExecutions();
        refetchMetrics();
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }

    getExecutions();

    const interval = setInterval(() => {
      refetchMetrics();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [entity]);

  const entityDetailsContextValues = {
    executionsList,
    entityDetails,
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
    abortTestExecution,
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

const EntityDetailsWrapper = styled.div`
  overflow: hidden;

  display: flex;

  height: 100%;
`;

export default EntityDetailsContainer;
