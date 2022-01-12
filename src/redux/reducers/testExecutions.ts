import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import initialState from '@redux/initialState';

import {TestExecutionsState} from '@src/models/testExecutions';

import {RootState} from '../store';

export const testExecutionsSlice = createSlice({
  name: 'testExecutionsSlice',
  initialState: initialState.testExecutions,
  reducers: {
    setTestExecutions: (state: Draft<TestExecutionsState>, action: PayloadAction<any>) => {
      state.testExecutionsList = action.payload;
    },
    setFilters: (state: Draft<TestExecutionsState>, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    setSelectedTestExecution: (state: Draft<TestExecutionsState>, action: PayloadAction<any>) => {
      state.selectedTestExecution = action.payload[0] || action.payload.selectedRecord;
    },
  },
});

export const selectTestExecutions = (state: RootState) => state.testExecutions.testExecutionsList;
export const selectFilters = (state: RootState) => state.testExecutions.filters;
export const selectSelectedTest = (state: RootState) => state.testExecutions.selectedTestExecution;
export const selectAllTestsFilters = (state: RootState) => ({
  filters: state.testExecutions.filters,
  filtered: state.testExecutions.filtered,
  totals: state.testExecutions.totals,
});

export const {setTestExecutions, setFilters, setSelectedTestExecution} = testExecutionsSlice.actions;

export default testExecutionsSlice.reducer;
