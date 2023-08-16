import {StateCreator} from 'zustand';

import {connectStore, createStoreFactory} from '@store/utils';

export interface LogOutputSlice {
  isFullscreen: boolean;
}

// TODO: Consider getting rid of that
const createLogOutputSlice: StateCreator<LogOutputSlice> = set => ({
  isFullscreen: false,
});

const createLogOutputStore = createStoreFactory('logOutput', createLogOutputSlice);
export const {
  use: useLogOutput,
  useField: useLogOutputField,
  pick: useLogOutputPick,
  sync: useLogOutputSync,
  init: initializeLogOutputStore,
} = connectStore(createLogOutputStore);
