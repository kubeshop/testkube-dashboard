import {StateCreator} from 'zustand';

import type {TestFilters, TestWithExecution} from '@models/test';

import {initialPageSize} from '@redux/initialState';

import {connectStore, createStoreFactory} from './utils';

interface TestsSlice {
  tests?: TestWithExecution[];
  filters: TestFilters;
}

export const initialFilters: TestFilters = {
  textSearch: '',
  type: '',
  pageSize: initialPageSize,
  page: 0,
  selector: [],
  createdAt: null,
  status: [],
};

const createTestsSlice: StateCreator<TestsSlice> = set => ({
  tests: undefined,
  filters: initialFilters,
});

const createTestsStore = createStoreFactory('Tests', createTestsSlice);

export const {
  use: useTests,
  useField: useTestsField,
  pick: useTestsPick,
  sync: useTestsSync,
  init: initializeTestsStore,
} = connectStore(createTestsStore);
