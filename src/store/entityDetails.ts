import {StateCreator} from 'zustand';

import {Entity} from '@models/entity';
import {Metrics} from '@models/metrics';

import {Customizable, Private, connectStore, createStoreFactory, makeCustomizable, makePrivate} from '@store/utils';

export interface EntityDetailsSlice {
  entity: Entity;
  isFirstTimeLoading: boolean;
  id?: string;
  execId?: string;
  defaultStackRoute: string;
  executions: any;
  details: any;
  metrics?: Metrics;
  daysFilterValue: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setDaysFilterValue: (days: number) => void;
  setMetrics: Private<(metrics?: Metrics) => void>;
  setExecutions: Private<(executions: any) => void>;
  setIsFirstTimeLoading: Private<(value: boolean) => void>;
  openExecutionDetails: Customizable<(dataItem: any) => void>;
  closeExecutionDetails: Customizable<() => void>;
  abortExecution: Customizable<(data: {id: string; executionId: string}) => Promise<any>>;
  abortAllExecutions: Customizable<(data: {id: string}) => Promise<any>>;
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
  setCurrentPage: currentPage => set({currentPage}),
  setDaysFilterValue: daysFilterValue => set({daysFilterValue}),
  openExecutionDetails: makeCustomizable(() => {}),
  closeExecutionDetails: makeCustomizable(() => {}),
  abortExecution: makeCustomizable(() => Promise.resolve()),
  abortAllExecutions: makeCustomizable(() => Promise.resolve()),
  setMetrics: makePrivate(metrics => set({metrics})),
  setExecutions: makePrivate(executions => set({executions})),
  setIsFirstTimeLoading: makePrivate(isFirstTimeLoading => set({isFirstTimeLoading})),
});

const createEntityDetailsStore = createStoreFactory('entityDetails', createEntityDetailsSlice);
export const {
  use: useEntityDetailsStore,
  sync: useEntityDetailsStoreSync,
  init: initializeEntityDetailsStore,
} = connectStore(createEntityDetailsStore);
