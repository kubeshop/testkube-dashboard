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
  executions: any;
  details: any;
  metrics?: Metrics;
  daysFilterValue: number;
  currentPage: number;
  selectedRow?: string; // TODO: Use "execId" instead?
  selectRow: (id?: string) => void;
  setCurrentPage: (page: number) => void;
  setDaysFilterValue: (days: number) => void;
  setMetrics: Private<(metrics?: Metrics) => void>;
  setExecutions: Private<(executions: any) => void>;
  setIsFirstTimeLoading: Private<(value: boolean) => void>;
  setDetails: Private<(details: any) => void>;
  setExecId: Private<(execId?: string) => void>;
  openExecutionDetails: Customizable<(dataItem: any) => void>;
  unselectRow: Customizable<() => void>; // TODO: Use "openExecutionDetails" instead?
  abortExecution: Customizable<any>; // TODO: Add types
  abortAllExecutions: Customizable<any>; // TODO: Add types
}

const createEntityDetailsSlice: StateCreator<EntityDetailsSlice> = set => ({
  entity: 'tests',
  isFirstTimeLoading: true,
  id: undefined,
  execId: undefined,
  defaultStackRoute: '/tests',
  executions: undefined,
  details: undefined,
  metrics: undefined,
  daysFilterValue: 7,
  currentPage: 1,
  selectedRow: undefined,
  setCurrentPage: currentPage => set({currentPage}),
  selectRow: (selectedRow?) => set({selectedRow}),
  setDaysFilterValue: daysFilterValue => set({daysFilterValue}),
  openExecutionDetails: makeCustomizable(() => {}),
  unselectRow: makeCustomizable(() => {}),
  abortExecution: makeCustomizable(() => {}),
  abortAllExecutions: makeCustomizable(() => {}),
  setDetails: makePrivate(details => set({details})),
  setExecId: makePrivate(execId => set({execId})),
  setMetrics: makePrivate(metrics => set({metrics})),
  setExecutions: makePrivate(executions => set({executions})),
  setIsFirstTimeLoading: makePrivate(isFirstTimeLoading => set({isFirstTimeLoading})),
});

const createEntityDetailsStore = createStoreFactory('entityDetails', createEntityDetailsSlice);
export const {use: useEntityDetailsStore, init: initializeEntityDetailsStore} = connectStore(createEntityDetailsStore);
