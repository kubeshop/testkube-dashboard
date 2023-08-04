import {StateCreator} from 'zustand';

import {ApiDetails} from '@services/apiEndpoint';

import {connectStore, createStoreFactory} from '@store/utils';

export interface ClusterDetailsSlice extends ApiDetails {
  reset: () => void;
  setClusterDetails: (state: ApiDetails) => void;
}
const initialState = {commit: '', context: '', helmchartVersion: '', namespace: '', version: '', url: ''};

const createClusterDetailsSlice: StateCreator<ClusterDetailsSlice> = set => ({
  ...initialState,
  reset: () => set(initialState),
  setClusterDetails: (state: ApiDetails) => set(state),
});

const createClusterDetailsStore = createStoreFactory('clusterDetails', createClusterDetailsSlice);
export const {
  use: useClusterDetails,
  useField: useClusterDetailsField,
  pick: useClusterDetailsPick,
  sync: useClusterDetailsSync,
  init: initializeClusterDetailsStore,
} = connectStore(createClusterDetailsStore);
