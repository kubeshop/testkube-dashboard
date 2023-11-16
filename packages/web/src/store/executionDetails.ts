import {StateCreator} from 'zustand';

import {Execution} from '@models/execution';
import {TestSuiteExecution} from '@models/testSuiteExecution';

import {connectStore, createStoreFactory} from './utils';

export interface ExecutionDetailsSlice {
  id?: string;
  data: Execution | TestSuiteExecution | null;
  error: any;
  open: (id: string) => void;
  openByName: (name: string) => void;
  close: () => void;
}

const createExecutionDetailsSlice: StateCreator<ExecutionDetailsSlice> = set => ({
  data: null,
  error: null,
  open: () => {},
  openByName: () => {},
  close: () => {},
});

const createExecutionDetailsStore = createStoreFactory('executionDetails', createExecutionDetailsSlice);
export const {
  useInstance: useExecutionDetailsInstance,
  use: useExecutionDetails,
  useField: useExecutionDetailsField,
  pick: useExecutionDetailsPick,
  sync: useExecutionDetailsSync,
  init: initializeExecutionDetailsStore,
  reset: useExecutionDetailsReset,
} = connectStore(createExecutionDetailsStore);
