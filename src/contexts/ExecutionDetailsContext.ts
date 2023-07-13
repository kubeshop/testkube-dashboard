import {createContext} from 'react';

import {Execution} from '@models/execution';
import {TestSuiteExecution} from '@models/testSuiteExecution';

export interface ExecutionDetailsOnDataChangeInterface {
  data: Execution | TestSuiteExecution | null;
  isLoading: boolean;
  isFetching: boolean;
  refetch: Function;
  error: any;
}

export type ExecutionDetailsContextProps = {
  onDataChange: (args: ExecutionDetailsOnDataChangeInterface) => void;
  data: Execution | TestSuiteExecution | null;
};

const ExecutionDetailsContext = createContext<ExecutionDetailsContextProps>({
  onDataChange: (args: ExecutionDetailsOnDataChangeInterface) => {},
  data: null,
});

export default ExecutionDetailsContext;
