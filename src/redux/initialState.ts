import {ConfigState} from '@models/config';
import {ExecutorsState} from '@models/executors';
import {SourcesState} from '@models/sources';
import {TestFilters, TestsState} from '@models/test';
import {TestSuiteFilters, TestSuitesState} from '@models/testSuite';

export const initialPageSize = 20;

export const initialTestSuitesFiltersState: TestSuiteFilters = {
  textSearch: '',
  pageSize: initialPageSize,
  page: 0,
  selector: [],
  startDate: null,
  endDate: null,
  status: [],
};

export const initialTestSuitesState: TestSuitesState = {
  isLoading: false,
  dataList: [],
  latestExecution: undefined,
  filters: initialTestSuitesFiltersState,
  totals: {
    results: 0,
    passed: 0,
    failed: 0,
    pending: 0,
  },
  filtered: {
    results: 0,
    passed: 0,
    failed: 0,
    pending: 0,
  },
};

export const initialTestsFiltersState: TestFilters = {
  textSearch: '',
  type: '',
  pageSize: initialPageSize,
  page: 0,
  selector: [],
  createdAt: null,
  status: [],
};

const initialTestsState: TestsState = {
  isLoading: false,
  dataList: [],
  latestExecution: undefined,
  filters: initialTestsFiltersState,
  totals: {
    results: 0,
    passed: 0,
    failed: 0,
    pending: 0,
  },
  filtered: {
    results: 0,
    passed: 0,
    failed: 0,
    pending: 0,
  },
};

const initialExecutorsState: ExecutorsState = {
  executorsList: [],
  executorsFeaturesMap: {},
  currentExecutor: undefined,
};

const initialConfigState: ConfigState = {
  namespace: 'testkube',
  fullScreenLogOutput: {
    isFullScreenLogOutput: false,
    logOutput: '',
    logOutputDOMRect: undefined,
  },
};

const initialSourcesState: SourcesState = {
  sourcesList: [],
  currentSource: undefined,
};

const initialReduxState = {
  testSuites: initialTestSuitesState,
  tests: initialTestsState,
  config: initialConfigState,
  executors: initialExecutorsState,
  sources: initialSourcesState,
};

export default initialReduxState;
