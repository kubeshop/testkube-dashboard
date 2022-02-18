import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import initialState from '@redux/initialState';

import {RootState} from '../store';

export const executionsSlice = createSlice({
  name: 'executions',
  initialState: initialState.executions,
  reducers: {
    setExecutions: (state, action: PayloadAction<any>) => {
      state.hasNext = action.payload?.hasNext;
      state.executionsList = action.payload.results;
      state.totals = action.payload.totals;
      state.filtered = action.payload.filtered;
    },
    setSelectedExecution: (state, action: PayloadAction<any>) => {
      if (action.payload && action.payload.results) {
        state.selectedExecution = action.payload.results[0];
      } else {
        state.selectedExecution = action.payload.selectedRecord;
      }
    },
    clearFiltredData: (state, action: PayloadAction<any>) => {
      state.filters = {
        status: action.payload.status,
        startDate: action.payload?.startDate || null,
        endDate: action.payload?.endDate || null,
        pageSize: state.filters.pageSize,
        testName: action.payload.testName,
        type: action.payload.type,
        page: 0,
        tags: action.payload.tags,
      };

      state.selectedTestId = undefined;
    },
    setFilters: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    paginateTo: (state, action: PayloadAction<any>) => {
      state.filters.page = action.payload;
    },
    nextPage: state => {
      state.filters.page += 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
    changePageSize: (state, action: PayloadAction<number>) => {
      state.filters.pageSize = action.payload;
    },
    prevPage: state => {
      state.filters.page -= 1;
    },
    updateSelectedTestId: (state, action: PayloadAction<any>) => {
      state.selectedTestId = action.payload;
    },
    updateSelectedTestExecutionStatus: (state, action: PayloadAction<any>) => {
      state.status = action.payload;
    },
    setSelectedExecutionInfo: (state, action: PayloadAction<any>) => {
      state.selectedExecutionInfo = action.payload;
    },
  },
});

export const selectTotals = (state: RootState) => state.executions.totals;
export const selectFiltered = (state: RootState) => state.executions.filtered;
export const selectExecutions = (state: RootState) => state.executions.executionsList;
export const selectFilters = (state: RootState) => state.executions.filters;
export const selectHasNext = (state: RootState) => state.executions.hasNext;
export const selectedTestId = (state: RootState) => state.executions.selectedTestId;
export const selectedTestExecutionStatus = (state: RootState) => state.executions.status;
export const selectAllExecutionsFilters = (state: RootState) => ({
  filters: state.executions.filters,
  filtered: state.executions.filtered,
  totals: state.executions.totals,
});
export const selectSelectedExecution = (state: RootState) => state.executions.selectedExecution;
export const selectedSelectedExecutionInfo = (state: RootState) => state.executions.selectedExecutionInfo;

export const {
  setExecutions,
  clearFiltredData,
  setFilters,
  paginateTo,
  nextPage,
  prevPage,
  setPage,
  changePageSize,
  updateSelectedTestId,
  updateSelectedTestExecutionStatus,
  setSelectedExecution,
  setSelectedExecutionInfo,
} = executionsSlice.actions;

export default executionsSlice.reducer;
