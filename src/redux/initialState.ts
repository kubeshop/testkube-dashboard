import {ConfigState} from '@models/config';
import {ExecutionsState} from '@models/executions';
import {ScriptsState} from '@models/scripts';
import {TagsState} from '@models/tags';
import {TestExecutionsState} from '@models/testExecutions';
import {TestsState} from '@models/tests';

const initialTestExecutionsState: TestExecutionsState = {
  isLoading: false,
  testExecutionsList: [],
  filters: {pageSize: 10, tags: '', textSearch: ''},
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
  selectedTestExecution: null,
};

const initialTestsState: TestsState = {
  isLoading: false,
  testsList: [],
  filters: {textSearch: '', pageSize: 10, tags: '', startDate: null, endDate: null},
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
  filters: {textSearch: '', type: '', pageSize: 10, tags: '', createdAt: null},
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
    type: '',
    tags: '',
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

const initialTagsState: TagsState = {
  tagsList: [],
};

const initialConfigState: ConfigState = {
  apiEndpoint: null,
};

export default {
  testExecutions: initialTestExecutionsState,
  tests: initialTestsState,
  scripts: initialScriptsState,
  executions: initialExecutionsState,
  tags: initialTagsState,
  config: initialConfigState,
};
