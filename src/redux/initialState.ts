import {ExecutionsState} from '@models/executions';
import {ScriptsState} from '@models/scripts';
import {TestsState} from '@models/tests';

const initialTestsState: TestsState = {
  isLoading: false,
  testsList: [],
  filters: {},
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

const initialScriptsState: ScriptsState = {
  isLoading: false,
  scriptsList: [],
  filters: {textSearch: ''},
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
  selectedScript: null,
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
    scriptName: '',
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

export default {
  tests: initialTestsState,
  scripts: initialScriptsState,
  executions: initialExecutionsState,
};
