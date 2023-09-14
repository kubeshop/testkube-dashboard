import {StateCreator} from 'zustand';

import {TestSuiteFilters, TestSuiteWithExecution} from '@models/testSuite';

import {initialPageSize} from '@redux/initialState';

import {connectStore, createStoreFactory} from '@store/utils';

interface TestSuitesSlice {
  testSuites?: TestSuiteWithExecution[];
  filters: TestSuiteFilters;
}

export const initialFilters: TestSuiteFilters = {
  textSearch: '',
  pageSize: initialPageSize,
  page: 0,
  selector: '',
  startDate: null,
  endDate: null,
  status: [],
};

const createTestSuitesSlice: StateCreator<TestSuitesSlice> = set => ({
  testSuites: undefined,
  filters: initialFilters,
});

const createTestSuitesStore = createStoreFactory('TestSuites', createTestSuitesSlice);

export const {
  use: useTestSuites,
  useField: useTestSuitesField,
  pick: useTestSuitesPick,
  sync: useTestSuitesSync,
  init: initializeTestSuitesStore,
} = connectStore(createTestSuitesStore);
