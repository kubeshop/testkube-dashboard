import {StateCreator} from 'zustand';

import {Entity} from '@models/entity';
import {Metrics} from '@models/metrics';

import {Customizable, Private, connectStore, createStoreFactory, makeCustomizable, makePrivate} from '@store/utils';

export interface EntityDetailsSlice {
  entity: Entity;
  isFirstTimeLoading: boolean;
  id?: string;
  execId?: string;
  defaultStackRoute: string; // TODO: Think if it's needed
  executionsList: any; // TODO: Rename to "executions"
  entityDetails: any; // TODO: Rename to "details"
  metrics?: Metrics;
  daysFilterValue: number; // TODO: Rename
  currentPage: number;
  isRowSelected: boolean; // TODO: Use "selectedRow" instead
  selectedRow?: string; // TODO: Use "execId" instead?
  selectRow: (id?: string) => void;
  setCurrentPage: (page: number) => void;
  setDaysFilterValue: (days: number) => void; // TODO: Rename
  setMetrics: Private<(metrics?: Metrics) => void>;
  setExecutionsList: Private<(executions: any) => void>; // TODO: Rename
  setIsFirstTimeLoading: Private<(value: boolean) => void>;
  setEntityDetails: Private<(details: any) => void>; // TODO: Rename
  setExecId: Private<(execId?: string) => void>; // TODO: Rename
  setIsRowSelected: Private<(isRowSelected: boolean) => void>; // TODO: Use "selectRow" instead?
  onRowSelect: Customizable<(dataItem: any) => void>; // TODO: Rename, as it's navigation
  unselectRow: Customizable<() => void>; // TODO: Use "onRowSelect" instead?
  abortExecution: Customizable<any>; // TODO: Add types
  abortAllExecutions: Customizable<any>; // TODO: Add types
}

const createEntityDetailsSlice: StateCreator<EntityDetailsSlice> = set => ({
  entity: 'tests',
  isFirstTimeLoading: true,
  id: undefined,
  execId: undefined,
  defaultStackRoute: '/tests',
  executionsList: undefined,
  entityDetails: undefined,
  metrics: undefined,
  daysFilterValue: 7,
  currentPage: 1,
  isRowSelected: false,
  selectedRow: undefined,
  setCurrentPage: currentPage => set({currentPage}),
  selectRow: (selectedRow?) => set({selectedRow}),
  setDaysFilterValue: daysFilterValue => set({daysFilterValue}),
  onRowSelect: makeCustomizable(() => {}),
  unselectRow: makeCustomizable(() => {}),
  abortExecution: makeCustomizable(() => {}),
  abortAllExecutions: makeCustomizable(() => {}),
  setEntityDetails: makePrivate(entityDetails => set({entityDetails})),
  setExecId: makePrivate(execId => set({execId})),
  setMetrics: makePrivate(metrics => set({metrics})),
  setExecutionsList: makePrivate(executionsList => set({executionsList})),
  setIsFirstTimeLoading: makePrivate(isFirstTimeLoading => set({isFirstTimeLoading})),
  setIsRowSelected: makePrivate(isRowSelected => set({isRowSelected})),
});

const createEntityDetailsStore = createStoreFactory('entityDetails', createEntityDetailsSlice);
export const {use: useEntityDetailsStore, init: initializeEntityDetailsStore} = connectStore(createEntityDetailsStore);
