import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {TestSuitesState} from '@models/testSuite';

import initialState from '@redux/initialState';

import {RootState} from '../store';

export const testSuitesSlice = createSlice({
  name: 'testSuitesSlice',
  initialState: initialState.testSuites,
  reducers: {
    setTestSuites: (state: Draft<TestSuitesState>, action: PayloadAction<any[]>) => {
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
export const selectAllTestSuitesFilters = (state: RootState) => ({
  filters: state.testSuites.filters,
  filtered: state.testSuites.filtered,
  totals: state.testSuites.totals,
});

export const {setTestSuites, setTestSuitesFilters} = testSuitesSlice.actions;

export default testSuitesSlice.reducer;
