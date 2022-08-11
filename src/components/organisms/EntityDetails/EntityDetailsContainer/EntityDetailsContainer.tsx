import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {notification} from 'antd';

import {EntityDetailsBlueprint} from '@models/entityDetails';

import {PollingIntervals} from '@utils/numbers';

import {EntityDetailsContext, MainContext} from '@contexts';

import EntityDetailsContent from '../EntityDetailsContent';
import ExecutionDetailsDrawer from '../ExecutionDetailsDrawer';

const EntityDetailsContainer: React.FC<EntityDetailsBlueprint> = props => {
  const {entity, useGetExecutions, useGetEntityDetails, useGetMetrics, defaultStackRoute} = props;

  const {navigate, location} = useContext(MainContext);
  const {pathname} = location;

  const params = useParams();
  const {id, execId} = params;

  const {data: executions} = useGetExecutions(id, {pollingInterval: PollingIntervals.everySecond});
  const {data: entityDetails} = useGetEntityDetails(id, {pollingInterval: PollingIntervals.everySecond});
  const {data: metrics} = useGetMetrics(id, {pollingInterval: PollingIntervals.everyTwoSeconds});

  const [selectedRow, selectRow] = useState();
  const [currentPage, setCurrentPage] = useState(1);

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

  const entityDetailsContextValues = {
    executionsList: executions,
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
  };

  useEffect(() => {
    if (execId && executions && executions?.results) {
      const neededExecution = executions?.results.filter((item: any) => {
        return item.id === execId;
      })[0];

      if (!neededExecution) {
        notification.error({message: 'Provided execution does not exist'});
        navigate(getDefaultUrl());
      } else {
        const targetEntity = executions.results?.filter((result: any) => {
          return result?.id === execId;
        });

        const targetEntityArrayIndex = executions.results?.indexOf(targetEntity[0]) + 1;

        onRowSelect(neededExecution, false);
        setCurrentPage(Math.ceil(targetEntityArrayIndex / 10));
      }
    } else {
      selectRow(undefined);
    }
  }, [executions, pathname]);

  return (
    <EntityDetailsContext.Provider value={entityDetailsContextValues}>
      <div style={{display: 'flex', height: '100%', overflow: 'hidden'}}>
        <EntityDetailsContent />
        <ExecutionDetailsDrawer />
      </div>
    </EntityDetailsContext.Provider>
  );
};

export default EntityDetailsContainer;
