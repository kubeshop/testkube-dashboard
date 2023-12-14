import {useEffect} from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {useGetTestSuiteExecutionMetricsQuery} from '@services/testSuites';

import {PollingIntervals} from '@src/utils/numbers';

import {useTestSuitesMetricsContext} from './TestSuitesMetricsContext';

type TestSuiteMetricsLayerProps = {
  name: string;
};

const TestSuiteMetricsLayer: React.FC<TestSuiteMetricsLayerProps> = props => {
  const {name} = props;

  const {testSuitesMetrics, setTestSuitesMetrics} = useTestSuitesMetricsContext();

  const isSystemAvailable = useSystemAccess(SystemAccess.system);

  const {data} = useGetTestSuiteExecutionMetricsQuery(
    {id: name, last: 7, limit: 13},
    {skip: !isSystemAvailable, pollingInterval: PollingIntervals.halfMin}
  );

  useEffect(() => {
    if (testSuitesMetrics) {
      setTestSuitesMetrics(prevMetrics => ({...prevMetrics, [name]: data}));
    }
  }, [data, testSuitesMetrics, name, setTestSuitesMetrics]);

  return null;
};

export default TestSuiteMetricsLayer;
