import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import type {TestSuiteWithExecution, TestSuitesState} from '@models/testSuite';

import initialState from '@redux/initialState';

import type {RootState} from '../store';

export const testSuitesSlice = createSlice({
  name: 'testSuitesSlice',
  initialState: initialState.testSuites,
  reducers: {
    setTestSuites: (state: Draft<TestSuitesState>, action: PayloadAction<TestSuiteWithExecution[]>) => {
      const adjustedPayload = action.payload.map(testItem => {
        return {dataItem: testItem.testSuite, latestExecution: testItem.latestExecution};
      });

      state.dataList = adjustedPayload;
    },
    setTestSuitesFilters: (state: Draft<TestSuitesState>, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
  },
});

export const selectTestSuites = (state: RootState) => state.testSuites.dataList;
export const selectTestSuitesFilters = (state: RootState) => state.testSuites.filters;

export const {setTestSuites, setTestSuitesFilters} = testSuitesSlice.actions;
