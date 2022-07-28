import {createContext} from 'react';

import {Entity} from '@models/entity';

const EntityExecutionsContext = createContext<{
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

export default EntityExecutionsContext;
