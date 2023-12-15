import {useGetTestSuiteExecutionMetricsQuery} from '@services/testSuites';
import {useGetTestExecutionMetricsQuery} from '@services/tests';

export interface ActionsDropdown {
  name: string;
  namespace?: string;
  outOfSync?: boolean;
  type?: string;
  useGetMetricsQuery: typeof useGetTestExecutionMetricsQuery | typeof useGetTestSuiteExecutionMetricsQuery;
}
