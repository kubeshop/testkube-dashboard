import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {TestsState} from '@models/tests';

import initialState from '@redux/initialState';

import {RootState} from '../store';

export const testsSlice = createSlice({
  name: 'testsSlice',
  initialState: initialState.tests,
  reducers: {
    setTests: (state: Draft<TestsState>, action: PayloadAction<any>) => {
      state.testsList = action.payload;
    },
    setFilters: (state: Draft<TestsState>, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    setSelectedTest: (state: Draft<TestsState>, action: PayloadAction<any>) => {
      state.selectedTest = action.payload[0] || action.payload.selectedRecord;
    },
  },
});

export const selectTests = (state: RootState) => state.tests.testsList;
export const selectFilters = (state: RootState) => state.tests.filters;
export const selectSelectedTest = (state: RootState) => state.tests.selectedTest;
export const selectAllTestsFilters = (state: RootState) => ({
  filters: state.tests.filters,
  filtered: state.tests.filtered,
  totals: state.tests.totals,
});

export const {setTests, setFilters, setSelectedTest} = testsSlice.actions;

export default testsSlice.reducer;
