import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import type {TestWithExecution, TestsState} from '@models/test';

import initialState from '@redux/initialState';

import type {RootState} from '../store';

export const testsSlice = createSlice({
  name: 'testsSlice',
  initialState: initialState.tests,
  reducers: {
    setTests: (state: Draft<TestsState>, action: PayloadAction<TestWithExecution[]>) => {
      const adjustedPayload = action.payload.map(testItem => {
        return {dataItem: testItem.test, latestExecution: testItem.latestExecution};
      });

      state.dataList = adjustedPayload;
    },
    setTestsFilters: (state: Draft<TestsState>, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
  },
});

export const selectTests = (state: RootState) => state.tests.dataList;
export const selectTestsFilters = (state: RootState) => state.tests.filters;
export const {setTests, setTestsFilters} = testsSlice.actions;

export default testsSlice.reducer;
