import {StateCreator} from 'zustand';

import {Entity} from '@models/entity';
import {Metrics} from '@models/metrics';

import {connectStore, createStoreFactory} from '@store/utils';

export interface EntityDetailsSlice {
  entity: Entity;
  isFirstTimeLoading: boolean;
  id?: string;
  executions: any;
  details: any;
  isV2: boolean;
  metrics?: Metrics;
  error: any;
  daysFilterValue: number;
  currentPage: number;
}

const createEntityDetailsSlice: StateCreator<EntityDetailsSlice> = set => ({
  entity: 'tests',
  isFirstTimeLoading: true,
  id: undefined,
  executions: undefined,
  details: undefined,
  isV2: false,
  metrics: undefined,
  error: null,
  daysFilterValue: 7,
  currentPage: 1,
});

const createEntityDetailsStore = createStoreFactory('entityDetails', createEntityDetailsSlice);
export const {
  use: useEntityDetails,
  useField: useEntityDetailsField,
  pick: useEntityDetailsPick,
  sync: useEntityDetailsSync,
  init: initializeEntityDetailsStore,
} = connectStore(createEntityDetailsStore);
