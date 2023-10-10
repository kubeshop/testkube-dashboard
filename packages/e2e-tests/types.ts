export type ExecutorData = any;
export type TestSuiteData = any;
export type TestSourceData = any;
export type TestData = any;
export type TestExecutionData = any;

export interface TestExecutionListResponse {
  totals: any;
  results: TestExecutionData[];
}
