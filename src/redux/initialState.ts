import {ConfigState} from '@models/config';
import {ExecutorsState} from '@models/executors';
import {SourcesState} from '@models/sources';
import {TestFilters, TestsState} from '@models/test';
import {TestSuiteFilters, TestSuitesState} from '@models/testSuite';
import {TestSuiteExecutionsState} from '@models/testSuiteExecution';

const initialTestSuiteExecutionsState: TestSuiteExecutionsState = {
  isLoading: false,
  dataList: [],
  filters: {pageSize: 10, page: 0, selector: '', textSearch: ''},
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
  selectedTestSuiteExecution: null,
};

export const initialTestSuitesState: TestSuitesState = {
  isLoading: false,
  dataList: [],
  latestExecution: undefined,
  filters: {textSearch: '', pageSize: 10, page: 0, selector: [], startDate: null, endDate: null, status: []},
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
  selectedTestSuite: undefined,
};

export const initialTestSuitesFiltersState: TestSuiteFilters = {
  textSearch: '',
  pageSize: 10,
  page: 0,
  selector: [],
  startDate: null,
  endDate: null,
  status: [],
};

export const initialTestsFiltersState: TestFilters = {
  textSearch: '',
  type: '',
  pageSize: 10,
  page: 0,
  selector: [],
  createdAt: null,
  status: [],
};

const initialTestsState: TestsState = {
  isLoading: false,
  dataList: [],
  latestExecution: null,
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
  selectedTest: null,
};

const initialExecutorsState: ExecutorsState = {
  executorsList: [],
  executorsFeaturesMap: {},
  currentExecutor: undefined,
};

const initialConfigState: ConfigState = {
  apiEndpoint: null,
  redirectTarget: {
    runTarget: false,
    targetTestExecutionId: null,
    targetTestId: null,
    isSettingsTabConfig: false,
  },
  fullScreenLogOutput: {
    isFullScreenLogOutput: false,
    logOutput: '',
  },
};

const initialSourcesState: SourcesState = {
  sourcesList: [],
};

const initialReduxState = {
  testSuiteExecutions: initialTestSuiteExecutionsState,
  testSuites: initialTestSuitesState,
  tests: initialTestsState,
  config: initialConfigState,
  executors: initialExecutorsState,
  sources: initialSourcesState,
};

export default initialReduxState;
