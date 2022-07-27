import {createContext, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {notification} from 'antd';

import {Entity} from '@models/entity';
import {EntityExecutionsBlueprint} from '@models/entityExecution';

import {PollingIntervals} from '@utils/numbers';

import {MainContext} from '@src/contexts';

import EntityExecutionsContent from '../EntityExecutionsContent';
import ExecutionDetailsDrawer from '../ExecutionDetailsDrawer';

export const EntityExecutionsContext = createContext<{
  executionsList: any;
  entityDetails: any;
  entity: Entity;
  onRowSelect: (dataItem: any, isManual?: boolean) => void;
  selectRow: React.Dispatch<React.SetStateAction<undefined>>;
  isRowSelected: boolean;
  selectedRow?: any;
  unselectRow: () => void;
  id?: string;
  execId?: string;
  defaultStackRoute: string;
}>({
  executionsList: {},
  entityDetails: {},
  entity: 'tests',
  onRowSelect: () => {},
  isRowSelected: false,
  selectedRow: undefined,
  selectRow: () => {},
  unselectRow: () => {},
  id: undefined,
  execId: undefined,
  defaultStackRoute: '',
});

const EntityExecutionsContainer: React.FC<EntityExecutionsBlueprint> = props => {
  const {entity, useGetExecutions, useGetEntityDetails, defaultStackRoute} = props;

  const {navigate, location} = useContext(MainContext);
  const {pathname} = location;

  const params = useParams();
  const {id, execId} = params;

  const {data: executions} = useGetExecutions(id, {pollingInterval: PollingIntervals.everySecond});
  const {data: entityDetails} = useGetEntityDetails(id as string);

  const [selectedRow, selectRow] = useState();

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

  const entityExecutionsContextValues = {
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
        onRowSelect(neededExecution, false);
      }
    } else {
      selectRow(undefined);
    }
  }, [executions, pathname]);

  return (
    <EntityExecutionsContext.Provider value={entityExecutionsContextValues}>
      <div style={{display: 'flex', height: '100%'}}>
        <EntityExecutionsContent />
        <ExecutionDetailsDrawer />
      </div>
    </EntityExecutionsContext.Provider>
  );
};

export default EntityExecutionsContainer;
