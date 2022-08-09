import {TestWithExecution} from '@models/test';
import {TestSuiteWithExecution} from '@models/testSuite';

export type OnDataChangeInterface = {
  data: TestSuiteWithExecution[] | TestWithExecution[];
  isLoading: boolean;
  isFetching: boolean;
  refetch: Function;
};
