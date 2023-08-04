import {StateCreator} from 'zustand';

import {connectStore, createStoreFactory} from '@store/utils';

export interface ApiDetailsSlice {
  data: any;
}

const createApiDetailsSlice: StateCreator<ApiDetailsSlice> = set => ({
  data: null,
});

const createApiDetailsStore = createStoreFactory('apiDetails', createApiDetailsSlice);
export const {
  use: useApiDetails,
  useField: useApiDetailsField,
  pick: useApiDetailsPick,
  sync: useApiDetailsSync,
  init: initializeApiDetailsStore,
} = connectStore(createApiDetailsStore);
