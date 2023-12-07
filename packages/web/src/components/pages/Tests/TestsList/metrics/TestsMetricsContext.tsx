import {createContext, useContext} from 'react';

import {Metrics} from '@models/metrics';

export type TestsMetricsContextValueType = {
  testsMetrics: Record<string, Metrics>;
  setTestsMetrics: React.Dispatch<React.SetStateAction<Record<string, Metrics>>>;
};

export const testsMetricsContextDefaultValue: TestsMetricsContextValueType = {
  testsMetrics: {},
  setTestsMetrics: () => {},
};

export const TestsMetricsContext = createContext<TestsMetricsContextValueType>(testsMetricsContextDefaultValue);

export const useTestsMetricsContext = () => useContext(TestsMetricsContext);
