import {ConfigState} from '@models/config';
import {ExecutionsState} from '@models/executions';
import {LabelsState} from '@models/labels';
import {TestSuiteExecutionsState} from '@models/testSuiteExecutions';
import {TestSuitesState} from '@models/testSuites';
import {TestsState} from '@models/tests';

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

const initialTestSuitesState: TestSuitesState = {
  isLoading: false,
  dataList: [],
  latestExecution: null,
  filters: {textSearch: '', pageSize: 10, page: 0, selector: '', startDate: null, endDate: null},
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
  selectedTestSuite: null,
};

const initialTestsState: TestsState = {
  isLoading: false,
  dataList: [],
  latestExecution: null,
  filters: {textSearch: '', type: '', pageSize: 10, page: 0, selector: [], createdAt: null},
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

const initialExecutionsState: ExecutionsState = {
  isLoading: false,
  executionsList: [],
  filters: {
    pageSize: 10,
    page: 0,
    status: undefined,
    startDate: null,
    endDate: null,
    testName: '',
    type: '',
    labels: [],
  },
  error: null,
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
  selectedTestId: undefined,
  status: undefined,

  hasNext: true,

  selectedExecution: null,
  selectedExecutionInfo: null,
};

const initialLabelsState: LabelsState = {
  labelsObject: {},
};

const initialConfigState: ConfigState = {
  apiEndpoint: null,
};

const initialReduxState = {
  testSuiteExecutions: initialTestSuiteExecutionsState,
  testSuites: initialTestSuitesState,
  tests: initialTestsState,
  executions: initialExecutionsState,
  labels: initialLabelsState,
  config: initialConfigState,
};

export default initialReduxState;
