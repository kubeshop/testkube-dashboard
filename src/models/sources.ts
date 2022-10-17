import {Repository} from '@models/repository';

interface Source {
  name: string;
  type?: 'git-uri';
}

export interface SourceWithString extends Source {
  uri: string;
  token?: string;
  username?: string;
}

export interface SourceWithRepository extends Source {
  repository: Repository;
}

type SourcesState = {
  sourcesList: SourceWithRepository[];
};

export type {SourcesState};
