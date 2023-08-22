import {Repository} from '@models/repository';

interface Source {
  name: string;
  type?: 'git-uri';
  namespace?: string;
}

export interface SourceWithRepository extends Source {
  repository: Repository;
}

export interface CreateSourceResult {
  metadata: {
    name: string;
    namespace: string;
    uid: string;
    resourceVersion: string;
    generation: 1;
    creationTimestamp: string;
  };
  spec: {
    repository: Repository;
  };
}
