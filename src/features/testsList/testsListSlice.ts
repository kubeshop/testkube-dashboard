import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store";
import { TestListState } from '../../app/types';

const initialState: TestListState = {
  filters: {
    pageSize: 10,
    page: 0,
    status: undefined,
    date: null,
  },
  error: null,
  totals: {
    results: 0,
    passed: 0,
    failed: 0,
    queued: 0,
    pending: 0
  },
  selectedTestId: undefined,

  results: [],
  resultsByDate: [],
  resultsByStatus: [],
  isLoading: false,
  hasNext: false
};

export const testsListSlice = createSlice({
  name: 'testsList',
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<any>,) => {
      state.hasNext = action.payload?.hasNext;
      state.results = [...state.results, ...action.payload?.data?.results];
      state.totals = action.payload?.data?.totals;
    },
    updateFiltredDataByStatus: (state, action: PayloadAction<any>,) => {
      state.hasNext = action.payload?.hasNext;
      state.resultsByStatus = [...state.resultsByStatus, ...action.payload?.data?.results];
      state.totals = action.payload?.data?.totals;
    },
    updateFiltredDataByDate: (state, action: PayloadAction<any>,) => {
      state.hasNext = action.payload?.hasNext;
      state.resultsByDate = [...state.resultsByDate, ...action.payload?.data?.results];
      state.totals = action.payload?.data?.totals;
    },
    clearFiltredData: (state, action: PayloadAction<any>) => {
      state.filters = {
        ...action.payload,
        pageSize: state.filters.pageSize
      };

      state.selectedTestId = undefined;
      state.results = [];
      state.resultsByStatus = [];
      state.resultsByDate = [];
    },
    updateFilter: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    nextPage: (state) => {
      state.filters.page += 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
    prevPage: (state) => {
      state.filters.page -= 1;
    },
    updateSelectedTestId: (state, action: PayloadAction<string>) => {
      state.selectedTestId = action.payload;
    },
  },
});

export const selectTotals = (state: RootState) => state.testsList.totals;
export const selectTests = (state: RootState) => state.testsList.results;
export const selectTestsByStatus = (state: RootState) => state.testsList.resultsByStatus;
export const selectTestsByDate = (state: RootState) => state.testsList.resultsByDate;
export const selectFilters = (state: RootState) => state.testsList.filters;
export const selectHasNext = (state: RootState) => state.testsList.hasNext;
export const selectedTestId = (state: RootState) => state.testsList.selectedTestId;

export const {
  updateData,
  updateFiltredDataByStatus,
  updateFiltredDataByDate,
  clearFiltredData,
  updateFilter,
  nextPage,
  prevPage,
  setPage,
  updateSelectedTestId
} = testsListSlice.actions;

export default testsListSlice.reducer;
