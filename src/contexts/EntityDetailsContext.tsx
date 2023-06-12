import {createContext} from 'react';

import {Entity} from '@models/entity';
import {Metrics} from '@models/metrics';

const EntityDetailsContext = createContext<{
  executionsList: any;
  entityDetails: any;
  entity: Entity;
  onRowSelect: (dataItem: any) => void;
  selectRow: (id?: string) => void;
  isRowSelected: boolean;
  selectedRow?: any;
  unselectRow: () => void;
  id?: string;
  execId?: string;
  defaultStackRoute: string;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  metrics?: Metrics;
  daysFilterValue: number;
  setDaysFilterValue: (days: number) => void;
  abortExecution: any;
  abortAllExecutions: any;
  isFirstTimeLoading: boolean;
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
  abortAllExecutions: () => {},
  isFirstTimeLoading: true,
});

export default EntityDetailsContext;
