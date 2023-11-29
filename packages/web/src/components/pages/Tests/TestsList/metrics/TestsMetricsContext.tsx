import {createContext, useContext} from 'react';

import {Metrics} from '@models/metrics';

export type TestsMetricsContextValueType = {
  metrics: Record<string, Metrics>;
  setMetrics: React.Dispatch<React.SetStateAction<Record<string, Metrics>>>;
};

export const testsMetricsContextDefaultValue: TestsMetricsContextValueType = {
  metrics: {},
  setMetrics: () => {},
};

export const TestsMetricsContext = createContext<TestsMetricsContextValueType>(testsMetricsContextDefaultValue);

export const useTestsMetricsContext = () => useContext(TestsMetricsContext);
