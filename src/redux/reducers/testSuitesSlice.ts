import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import initialState from '@redux/initialState';

import {TestSuitesState} from '@src/models/testSuites';

import {RootState} from '../store';

export const testSuitesSlice = createSlice({
  name: 'testSuitesSlice',
  initialState: initialState.testSuites,
  reducers: {
    setTestSuites: (state: Draft<TestSuitesState>, action: PayloadAction<any>) => {
      const adjustedPayload = action.payload.map((testItem: any) => {
        return {dataItem: testItem.testSuite, latestExecution: testItem.latest_execution};
      });

      state.dataList = adjustedPayload;
    },
    setTestSuitesFilters: (state: Draft<TestSuitesState>, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    setSelectedTestSuite: (state: Draft<TestSuitesState>, action: PayloadAction<any>) => {
      state.selectedTestSuite = action.payload[0] || action.payload.selectedRecord;
    },
  },
});

export const selectTestSuites = (state: RootState) => state.testSuites.dataList;
export const selectTestSuitesFilters = (state: RootState) => state.testSuites.filters;
export const selectSelectedTestSuite = (state: RootState) => state.testSuites.selectedTestSuite;
export const selectAllTestSuitesFilters = (state: RootState) => ({
  filters: state.testSuites.filters,
  filtered: state.testSuites.filtered,
  totals: state.testSuites.totals,
});

export const {setTestSuites, setTestSuitesFilters, setSelectedTestSuite} = testSuitesSlice.actions;

export default testSuitesSlice.reducer;
