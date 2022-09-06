import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {notification} from 'antd';

import styled from 'styled-components';

import {EntityDetailsBlueprint} from '@models/entityDetails';

import {notificationCall} from '@molecules';

import useStateCallback from '@hooks/useStateCallback';
import useWebSocket from '@hooks/useWebSocket';

import {EntityDetailsContext, MainContext} from '@contexts';

import EntityDetailsContent from '../EntityDetailsContent';
import ExecutionDetailsDrawer from '../ExecutionDetailsDrawer';

const EntityDetailsContainer: React.FC<EntityDetailsBlueprint> = props => {
  const {entity, useGetExecutions, useGetEntityDetails, useGetMetrics, defaultStackRoute} = props;

  const {navigate, location} = useContext(MainContext);
  const {pathname} = location;

  const params = useParams();
  const {id, execId} = params;

  const [daysFilterValue, setDaysFilterValue] = useState(7);
  const [selectedRow, selectRow] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [executionsList, setExecutionsList] = useStateCallback<any>(null);

  const {data: executions} = useGetExecutions({id, last: daysFilterValue});
  const {data: entityDetails} = useGetEntityDetails(id);
  const {data: metrics, refetch: refetchMetrics} = useGetMetrics({id, last: daysFilterValue});

  const onWebSocketData = (event: any) => {
    try {
      const {execution, type} = JSON.parse(event.data);

      const adjustedExecution = {
        ...execution,
        status: execution.executionResult.status,
      };

      if (executionsList) {
        if (type === 'start-test') {
          setExecutionsList(
            {
              ...executionsList,
              results: [adjustedExecution, ...executionsList.results],
            },
            () => {
              onRowSelect(adjustedExecution, true);

              refetchMetrics();

              notificationCall('passed', 'Test started');
            }
          );
        }

        if (type === 'end-test') {
          const targetIndex = executionsList.results.findIndex((item: any) => {
            return item.id === execution.id;
          });

          if (targetIndex !== -1) {
            setExecutionsList(
              {
                ...executionsList,
                results: executionsList.results.map((item: any, index: number) => {
                  if (index === targetIndex) {
                    return {...item, ...execution, status: execution.executionResult.status};
                  }

                  return item;
                }),
              },
              () => {
                refetchMetrics();

                notificationCall(execution.executionResult.status, 'Test finished');
              }
            );
          }
        }
      }
    } catch (err: any) {
      console.log('err: ', err);
    }
  };

  useWebSocket({endpoint: '/events/stream', cb: onWebSocketData});

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
    if (executions) {
      setExecutionsList(executions);
    }
  }, [executions]);

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
