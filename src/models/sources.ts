import {Repository} from '@models/repository';

interface Source {
  name: string;
  type?: 'git-uri';
}

export interface SourceWithRepository extends Source {
  repository: Repository;
}

type SourcesState = {
  sourcesList: SourceWithRepository[];
  currentSource?: SourceWithRepository;
};

export type {SourcesState};
