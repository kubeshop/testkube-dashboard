import {createContext} from 'react';

import {Entity} from '@models/entity';
import {Metrics} from '@models/metrics';

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
  metrics?: Metrics;
  daysFilterValue: number;
  setDaysFilterValue: React.Dispatch<React.SetStateAction<number>>;
  abortExecution: any;
  isFirstTimeLoading: boolean;
  setFirstTimeLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  metrics: undefined,
  daysFilterValue: 7, // 0 means to see all executions
  setDaysFilterValue: () => {},
  abortExecution: () => {},
  isFirstTimeLoading: true,
  setFirstTimeLoading: () => {},
});

export default EntityDetailsContext;
