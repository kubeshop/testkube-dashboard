import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

import {notification} from 'antd';

import styled from 'styled-components';

import {EntityDetailsBlueprint} from '@models/entityDetails';
import {WSData} from '@models/websocket';

import {useAppSelector} from '@redux/hooks';
import {selectApiEndpoint} from '@redux/reducers/configSlice';

import useStateCallback from '@hooks/useStateCallback';

import {EntityDetailsContext, MainContext} from '@contexts';

import EntityDetailsContent from '../EntityDetailsContent';
import ExecutionDetailsDrawer from '../ExecutionDetailsDrawer';

const EntityDetailsContainer: React.FC<EntityDetailsBlueprint> = props => {
  const {entity, useGetExecutions, useGetEntityDetails, useGetMetrics, defaultStackRoute} = props;

  const apiEndpoint = useAppSelector(selectApiEndpoint);

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

  const onWebSocketData = (wsData: WSData) => {
    try {
      if (executionsList) {
        if (wsData.type === 'start-test' && id === wsData.testExecution.testName) {
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

        if (wsData.type === 'end-test-success') {
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
  const wsRoot = apiEndpoint ? apiEndpoint.replace(/https?/, 'ws') : '';

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
