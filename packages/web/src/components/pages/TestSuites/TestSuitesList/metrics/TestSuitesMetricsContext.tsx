import {createContext, useContext} from 'react';

import {Metrics} from '@models/metrics';

export type TestSuitesMetricsContextValueType = {
  metrics: Record<string, Metrics>;
  setMetrics: React.Dispatch<React.SetStateAction<Record<string, Metrics>>>;
};

export const testSuitesMetricsContextDefaultValue: TestSuitesMetricsContextValueType = {
  metrics: {},
  setMetrics: () => {},
};

export const TestSuitesMetricsContext = createContext<TestSuitesMetricsContextValueType>(
  testSuitesMetricsContextDefaultValue
);

export const useTestSuitesMetricsContext = () => useContext(TestSuitesMetricsContext);
