import {EntityMap} from '@models/entityMap';
import {Execution, ExecutionRequest} from '@models/execution';
import {Repository} from '@models/repository';
import {Variables} from '@models/variable';

export type TestContentTypeEnum = 'file-uri' | 'git-file' | 'git-dir' | 'string';

export type TestContent = {
  type: TestContentTypeEnum;
  repository: Repository;
  data: string;
  uri: string;
};

export type Test = {
  name: string;
  namespace: string;
  type: string;
  content: TestContent;
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

export type TestForTrigger = {
  name: Test['name'];
  namespace: Test['namespace'];
  type: Test['type'];
};

interface TestsState {
  isLoading?: boolean;
  dataList: Test[];
  latestExecution: any;
  filters: TestFilters;
  totals: {};
  filtered: {};
}

export type AddTestPayload = {
  data?: {
    metadata: {
      name: string;
    };
    spec: {
      content: any;
      type: any;
    };
    status: {
      // eslint-disable-next-line camelcase
      last_execution: any;
    };
  };
  error?: any;
};

export type {TestsState};
