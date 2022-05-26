import {EntityMap} from '@models/entityMap';
import {Execution} from '@models/execution';
import {Repository} from '@models/repository';

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
};

export type TestWithExecution = {
  dataList: Test;
  latestExecution?: Execution;
};
