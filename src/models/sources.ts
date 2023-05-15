import {Repository} from '@models/repository';

interface Source {
  name: string;
  type?: 'git-uri';
  namespace?: string;
}

export interface SourceWithRepository extends Source {
  repository: Repository;
}

type SourcesState = {
  sourcesList: SourceWithRepository[];
  currentSource?: SourceWithRepository;
};

export type CreateSourceResult = {
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
};

export type {SourcesState};
