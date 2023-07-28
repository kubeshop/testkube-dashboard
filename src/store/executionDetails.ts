import {StateCreator} from 'zustand';

import {Execution} from '@models/execution';
import {TestSuiteExecution} from '@models/testSuiteExecution';

import {connectStore, createStoreFactory} from '@store/utils';

export interface ExecutionDetailsSlice {
  data: Execution | TestSuiteExecution | null;
  error: any;
}

const createExecutionDetailsSlice: StateCreator<ExecutionDetailsSlice> = set => ({
  data: null,
  error: null,
});

const createExecutionDetailsStore = createStoreFactory('executionDetails', createExecutionDetailsSlice);
export const {
  use: useExecutionDetails,
  useField: useExecutionDetailsField,
  pick: useExecutionDetailsPick,
  sync: useExecutionDetailsSync,
  init: initializeExecutionDetailsStore,
} = connectStore(createExecutionDetailsStore);