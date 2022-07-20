import {createContext, useState} from 'react';
import {useParams} from 'react-router-dom';

import {Entity} from '@models/entity';
import {EntityExecutionsBlueprint} from '@models/entityExecution';

import {PollingIntervals} from '@utils/numbers';

import EntityExecutionsContent from '../EntityExecutionsContent';

export const EntityExecutionsContext = createContext<{
  executionsList: any;
  entityDetails: any;
  entity?: Entity;
  onRowSelect?: any;
}>({
  executionsList: {},
  entityDetails: {},
  entity: undefined,
  onRowSelect: () => {},
});

const EntityExecutionsContainer: React.FC<EntityExecutionsBlueprint> = props => {
  const {entity, useGetExecutions, useGetEntityDetails} = props;

  const {id} = useParams();

  const {data: executions} = useGetExecutions(id, {pollingInterval: PollingIntervals.everySecond});
  const {data: entityDetails} = useGetEntityDetails(id as string);

  const [selectedRow, selectRow] = useState();

  const onRowSelect = (dataItem: any) => {
    selectRow(dataItem);
  };

  const entityExecutionsContextValues = {
    executionsList: executions,
    entityDetails,
    entity,
    onRowSelect,
  };

  const isRowSelected = Boolean(selectedRow);

  return (
    <EntityExecutionsContext.Provider value={entityExecutionsContextValues}>
      <EntityExecutionsContent />
      {isRowSelected ? <div>pidar</div> : null}
    </EntityExecutionsContext.Provider>
  );
};

export default EntityExecutionsContainer;
