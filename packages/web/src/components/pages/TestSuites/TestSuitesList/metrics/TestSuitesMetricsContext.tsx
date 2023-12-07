import {createContext, useContext} from 'react';

import {Metrics} from '@models/metrics';

export type TestSuitesMetricsContextValueType = {
  testSuitesMetrics: Record<string, Metrics>;
  setTestSuitesMetrics: React.Dispatch<React.SetStateAction<Record<string, Metrics>>>;
};

export const testSuitesMetricsContextDefaultValue: TestSuitesMetricsContextValueType = {
  testSuitesMetrics: {},
  setTestSuitesMetrics: () => {},
};

export const TestSuitesMetricsContext = createContext<TestSuitesMetricsContextValueType>(
  testSuitesMetricsContextDefaultValue
);

export const useTestSuitesMetricsContext = () => useContext(TestSuitesMetricsContext);
