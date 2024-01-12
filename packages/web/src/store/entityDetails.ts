import {StateCreator} from 'zustand';

import type {Entity} from '@models/entity';
import {ExecutionStatusEnum} from '@models/execution';
import type {Metrics} from '@models/metrics';

import {connectStore, createStoreFactory} from './utils';

export interface EntityDetailsSlice {
  currentPage: number;
  daysFilterValue: number;
  entity: Entity;
  isFirstTimeLoading: boolean;
  isV2: boolean;
  details?: any;
  error?: any;
  executions?: any;
  executionsFilters: {
    textSearch: string;
    status: ExecutionStatusEnum[];
  };
  executionsLoading: boolean;
  id?: string;
  metrics?: Metrics;
}

const createEntityDetailsSlice: StateCreator<EntityDetailsSlice> = set => ({
  currentPage: 1,
  daysFilterValue: 7,
  entity: 'tests',
  isFirstTimeLoading: true,
  isV2: false,
  details: undefined,
  error: undefined,
  executions: undefined,
  executionsFilters: {
    textSearch: '',
    status: [],
  },
  executionsLoading: false,
  id: undefined,
  metrics: undefined,
});

const createEntityDetailsStore = createStoreFactory('entityDetails', createEntityDetailsSlice);
export const {
  useInstance: useEntityDetailsInstance,
  use: useEntityDetails,
  useField: useEntityDetailsField,
  pick: useEntityDetailsPick,
  sync: useEntityDetailsSync,
  init: initializeEntityDetailsStore,
  reset: useEntityDetailsReset,
} = connectStore(createEntityDetailsStore);
