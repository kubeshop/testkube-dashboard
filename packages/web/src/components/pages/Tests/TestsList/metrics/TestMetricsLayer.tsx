import {useEffect} from 'react';

import {isEqual} from 'lodash';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {useGetTestExecutionMetricsQuery} from '@services/tests';

import {PollingIntervals} from '@src/utils/numbers';

import {useTestsMetricsContext} from './TestsMetricsContext';

type TestMetricsLayerProps = {
  name: string;
};

const TestMetricsLayer: React.FC<TestMetricsLayerProps> = props => {
  const {name} = props;

  const {metrics, setMetrics} = useTestsMetricsContext();

  const isSystemAvailable = useSystemAccess(SystemAccess.system);

  const {data} = useGetTestExecutionMetricsQuery(
    {id: name, last: 7, limit: 13},
    {skip: !isSystemAvailable, pollingInterval: PollingIntervals.halfMin}
  );

  useEffect(() => {
    if (isEqual(metrics[name], data)) {
      return;
    }

    if (metrics) {
      setMetrics(prevMetrics => ({...prevMetrics, [name]: data}));
    }
  }, [data, metrics, name, setMetrics]);

  return null;
};

export default TestMetricsLayer;
