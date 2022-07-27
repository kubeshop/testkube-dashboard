import {createContext} from 'react';

import {Execution} from '@models/execution';
import {TestSuiteExecution} from '@models/testSuiteExecution';

export interface ExecutionDetailsOnDataChangeInterface {
  data: Nullable<Execution | TestSuiteExecution>;
  isLoading: boolean;
  isFetching: boolean;
  refetch: Function;
}

type ExecutionDetailsContextProps = {
  onDataChange: (args: ExecutionDetailsOnDataChangeInterface) => void;
};

const ExecutionDetailsContext = createContext<ExecutionDetailsContextProps>({
  onDataChange: (args: ExecutionDetailsOnDataChangeInterface) => {},
});

export default ExecutionDetailsContext;
