import {StateCreator} from 'zustand';

import {SourceWithRepository} from '@models/sources';

import {connectStore, createStoreFactory} from './utils';

interface SourcesSlice {
  sources?: SourceWithRepository[];
  current?: SourceWithRepository;
}

const createSourcesSlice: StateCreator<SourcesSlice> = set => ({
  sources: undefined,
  current: undefined,
});

const createSourcesStore = createStoreFactory('Sources', createSourcesSlice);

export const {
  use: useSources,
  useField: useSourcesField,
  pick: useSourcesPick,
  sync: useSourcesSync,
  init: initializeSourcesStore,
} = connectStore(createSourcesStore);
