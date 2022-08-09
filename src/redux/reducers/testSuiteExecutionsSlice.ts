import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {TestSuiteExecutionsState} from '@models/testSuiteExecution';

import initialState from '@redux/initialState';

import {RootState} from '../store';

export const testSuiteExecutionsSlice = createSlice({
  name: 'testSuiteExecutionsSlice',
  initialState: initialState.testSuiteExecutions,
  reducers: {
    setTestSuiteExecutions: (state: Draft<TestSuiteExecutionsState>, action: PayloadAction<any>) => {
      state.dataList = action.payload.results;
    },
    setTestSuiteExecutionsFilters: (state: Draft<TestSuiteExecutionsState>, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    setSelectedTestSuiteExecution: (state: Draft<TestSuiteExecutionsState>, action: PayloadAction<any>) => {
      if (action.payload && action.payload.results) {
        state.selectedTestSuiteExecution = action.payload.results[0];
      } else {
        state.selectedTestSuiteExecution = action.payload.selectedRecord;
      }
    },
  },
});

export const selectTestSuiteExecutions = (state: RootState) => state.testSuiteExecutions.dataList;
export const selectTestSuiteExecutionsFilters = (state: RootState) => state.testSuiteExecutions.filters;
export const selectSelectedTestSuiteExecution = (state: RootState) =>
  state.testSuiteExecutions.selectedTestSuiteExecution;
export const selectAllTestSuiteExecutionsFilters = (state: RootState) => ({
  filters: state.testSuiteExecutions.filters,
  filtered: state.testSuiteExecutions.filtered,
  totals: state.testSuiteExecutions.totals,
});

export const {setTestSuiteExecutions, setTestSuiteExecutionsFilters, setSelectedTestSuiteExecution} =
  testSuiteExecutionsSlice.actions;

export default testSuiteExecutionsSlice.reducer;
