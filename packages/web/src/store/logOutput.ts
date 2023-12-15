import {StateCreator} from 'zustand';

import {connectStore, createStoreFactory} from './utils';

export interface SearchResult {
  line: number;
  start: number;
  end: number;
}

export interface LogOutputSlice {
  isFullscreen: boolean;
  searchIndex: number;
  searchQuery: string;
  searching: boolean;
  searchResults: SearchResult[];
  searchLinesMap: Record<number, SearchResult[]>;
}

// TODO: Consider getting rid of that
const createLogOutputSlice: StateCreator<LogOutputSlice> = set => ({
  isFullscreen: false,
  searching: false,
  searchIndex: 0,
  searchQuery: '',
  searchResults: [],
  searchLinesMap: {},
});

const createLogOutputStore = createStoreFactory('logOutput', createLogOutputSlice);
export const {
  use: useLogOutput,
  useField: useLogOutputField,
  pick: useLogOutputPick,
  sync: useLogOutputSync,
  init: initializeLogOutputStore,
} = connectStore(createLogOutputStore);
