import {createContext} from 'react';

import {Entity} from '@models/entity';

const EntityDetailsContext = createContext<{
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
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
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
  setCurrentPage: () => {},
  currentPage: 1,
});

export default EntityDetailsContext;
