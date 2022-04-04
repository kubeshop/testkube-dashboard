import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {TestsState} from '@models/tests';

import initialState from '@redux/initialState';

import {RootState} from '../store';

type SetTestsPayload = any;

type SetSelectedTestPayload = any;

type SetTestsFiltersPayload = any;

export const testsSlice = createSlice({
  name: 'testsSlice',
  initialState: initialState.tests,
  reducers: {
    setTests: (state: Draft<TestsState>, action: PayloadAction<SetTestsPayload>) => {
      const adjustedPayload = action.payload.map((testItem: any) => {
        return {dataItem: testItem.test, latestExecution: testItem.latestExecution};
      });

      state.dataList = adjustedPayload;
    },
    setTestsFilters: (state: Draft<TestsState>, action: PayloadAction<SetTestsFiltersPayload>) => {
      state.filters = action.payload;
    },
    setSelectedTest: (state: Draft<TestsState>, action: PayloadAction<SetSelectedTestPayload>) => {
      state.selectedTest = action.payload[0] || action.payload.selectedRecord;
    },
  },
});

export const selectTests = (state: RootState) => state.tests.dataList;
export const selectTestsFilters = (state: RootState) => state.tests.filters;
export const selectSelectedTest = (state: RootState) => state.tests.selectedTest;
export const selectAllTestsFilters = (state: RootState) => ({
  filters: state.tests.filters,
  filtered: state.tests.filtered,
  totals: state.tests.totals,
});

export const {setTests, setTestsFilters, setSelectedTest} = testsSlice.actions;

export default testsSlice.reducer;
