import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import initialState from '@redux/initialState';

import {TestExecutionsState} from '@src/models/testExecutions';

import {RootState} from '../store';

export const testExecutionsSlice = createSlice({
  name: 'testExecutionsSlice',
  initialState: initialState.testExecutions,
  reducers: {
    setTestExecutions: (state: Draft<TestExecutionsState>, action: PayloadAction<any>) => {
      state.testExecutionsList = action.payload.results;
    },
    setFilters: (state: Draft<TestExecutionsState>, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    setSelectedTestExecution: (state: Draft<TestExecutionsState>, action: PayloadAction<any>) => {
      if (action.payload && action.payload.results) {
        state.selectedTestExecution = action.payload.results[0];
      } else {
        state.selectedTestExecution = action.payload.selectedRecord;
      }
    },
  },
});

export const selectTestExecutions = (state: RootState) => state.testExecutions.testExecutionsList;
export const selectFilters = (state: RootState) => state.testExecutions.filters;
export const selectSelectedTestExecution = (state: RootState) => state.testExecutions.selectedTestExecution;
export const selectAllTestsFilters = (state: RootState) => ({
  filters: state.testExecutions.filters,
  filtered: state.testExecutions.filtered,
  totals: state.testExecutions.totals,
});

export const {setTestExecutions, setFilters, setSelectedTestExecution} = testExecutionsSlice.actions;

export default testExecutionsSlice.reducer;
