import {ExecutorsState} from '@models/executors';

export const initialPageSize = 20;

const initialExecutorsState: ExecutorsState = {
  executorsList: [],
  executorsFeaturesMap: {},
  currentExecutor: undefined,
};

const initialReduxState = {
  executors: initialExecutorsState,
};

export default initialReduxState;
