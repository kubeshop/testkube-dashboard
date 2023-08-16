import {StateCreator} from 'zustand';

import {Coordinates} from '@models/config';

import {connectStore, createStoreFactory} from '@store/utils';

export interface LogOutputSlice {
  output: string;
  isFullscreen: boolean;
  rect?: Coordinates;
}

// TODO: Consider getting rid of that
const createLogOutputSlice: StateCreator<LogOutputSlice> = set => ({
  output: '',
  isFullscreen: false,
  rect: undefined,
});

const createLogOutputStore = createStoreFactory('logOutput', createLogOutputSlice);
export const {
  use: useLogOutput,
  useField: useLogOutputField,
  pick: useLogOutputPick,
  sync: useLogOutputSync,
  init: initializeLogOutputStore,
} = connectStore(createLogOutputStore);
