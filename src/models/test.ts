import {EntityMap} from '@models/entityMap';
import {Execution, ExecutionRequest} from '@models/execution';
import {Variables} from '@models/variable';
import {Source} from '@models/Source';

export type Test = {
  name: string;
  namespace: string;
  type: string;
  content: Source;
  created: string;
  labels: EntityMap;
  schedule: string;
  params: EntityMap;
  variables?: Variables;
  executorArgs?: string[];
  executionRequest: ExecutionRequest;
  testIcon?: string;
};

export type TestWithExecution = {
  test: Test;
  latestExecution?: Execution;
};

export type TestFilters = {
  textSearch: string;
  type: string;
  pageSize: number;
  page: number;
  selector: string[];
  createdAt: null;
  status: Array<string>;
};
interface TestsState {
  isLoading?: boolean;
  dataList: Test[];
  latestExecution: any;
  filters: TestFilters;
  totals: {};
  filtered: {};
  selectedTest: Test | null;
}

export type {TestsState};
