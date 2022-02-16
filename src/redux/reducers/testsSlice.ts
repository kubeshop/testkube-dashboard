import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {Script, TestsState} from '@models/tests';

import initialState from '@redux/initialState';

import {RootState} from '../store';

type SetScriptsPayload = Script[];

type SetSelectedScriptPayload = any;

type SetFiltersPayload = any;

export const testsSlice = createSlice({
  name: 'testsSlice',
  initialState: initialState.tests,
  reducers: {
    setTests: (state: Draft<TestsState>, action: PayloadAction<SetScriptsPayload>) => {
      state.dataList = action.payload;
    },
    setTestsFilters: (state: Draft<TestsState>, action: PayloadAction<SetFiltersPayload>) => {
      state.filters = action.payload;
    },
    setSelectedTest: (state: Draft<TestsState>, action: PayloadAction<SetSelectedScriptPayload>) => {
      state.selectedTest = action.payload[0] || action.payload.selectedRecord;
    },
  },
});

export const selectTests = (state: RootState) => state.tests.dataList;
export const selectTestsFilters = (state: RootState) => state.tests.filters;
export const selectSelectedTest = (state: RootState) => state.tests.selectedTest;
export const selectAllTestsFilters = (state: RootState) => ({
  filters: state.tests.filters,
  filtered: state.tests.filtered,
  totals: state.tests.totals,
});

export const {setTests, setTestsFilters, setSelectedTest} = testsSlice.actions;

export default testsSlice.reducer;
