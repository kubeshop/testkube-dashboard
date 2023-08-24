import {StateCreator} from 'zustand';

import type {Execution} from '@models/execution';
import type {TestSuiteExecution} from '@models/testSuiteExecution';

import {connectStore, createStoreFactory} from './utils';

export interface ExecutionDetailsSlice {
  id?: string;
  data: Execution | TestSuiteExecution | null;
  error: any;
  open: (id: string) => void;
  close: () => void;
}

const createExecutionDetailsSlice: StateCreator<ExecutionDetailsSlice> = set => ({
  data: null,
  error: null,
  open: () => {},
  close: () => {},
});

const createExecutionDetailsStore = createStoreFactory('executionDetails', createExecutionDetailsSlice);
export const {
  use: useExecutionDetails,
  useField: useExecutionDetailsField,
  pick: useExecutionDetailsPick,
  sync: useExecutionDetailsSync,
  init: initializeExecutionDetailsStore,
} = connectStore(createExecutionDetailsStore);
