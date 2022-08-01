import {createContext} from 'react';

import {Execution} from '@models/execution';
import {TestSuiteExecution} from '@models/testSuiteExecution';

export interface ExecutionDetailsOnDataChangeInterface {
  data: Nullable<Execution | TestSuiteExecution>;
  isLoading: boolean;
  isFetching: boolean;
  refetch: Function;
}

export type ExecutionDetailsContextProps = {
  onDataChange: (args: ExecutionDetailsOnDataChangeInterface) => void;
  data: Nullable<Execution | TestSuiteExecution>;
};

const ExecutionDetailsContext = createContext<ExecutionDetailsContextProps>({
  onDataChange: (args: ExecutionDetailsOnDataChangeInterface) => {},
  data: null,
});

export default ExecutionDetailsContext;
