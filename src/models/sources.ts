import {CustomSource} from '@models/Source';

type SourcesState = {
  sourcesList: CustomSource[];
  currentSource?: CustomSource;
};

export type SourcesFormFields = {
  sourcesFormList: CustomSource[];
};

export type {SourcesState};
