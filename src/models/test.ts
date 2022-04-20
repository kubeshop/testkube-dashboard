import {LabelMap} from '@models/labels';
import {ParamMap} from '@models/param';
import {Repository} from '@models/repository';

export type TestContentTypeEnum = 'file-uri' | 'git-file' | 'git-dir' | string;

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
  labels: LabelMap;
  schedule: string;
  params: ParamMap;
};
