import {ExecutorsState} from '@models/executors';
import {SourcesState} from '@models/sources';

export const initialPageSize = 20;

const initialExecutorsState: ExecutorsState = {
  executorsList: [],
  executorsFeaturesMap: {},
  currentExecutor: undefined,
};

const initialSourcesState: SourcesState = {
  sourcesList: [],
  currentSource: undefined,
};

const initialReduxState = {
  executors: initialExecutorsState,
  sources: initialSourcesState,
};

export default initialReduxState;
