import {Repository} from '@models/repository';

interface Source {
  name: string;
  username: string;
  token: string;
}

export interface SourceWithString extends Source {
  uri: string;
}

export interface SourceWithRepository extends Source {
  repository: Repository;
}

type SourcesState = {
  sourcesList: SourceWithRepository[];
};

export type {SourcesState};
