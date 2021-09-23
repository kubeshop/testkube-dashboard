export type ITestStatus = {
  status: 'queued' | 'error' | 'success' | 'pending';
};

export interface ITests {
  id: number;
  scriptName: string;
  scriptType: string;
  status: ITestStatus;
  startTime: string;
  endTime: string;
}

export interface ITest {
  status: string;
  startTime: string;
  endTime: string;
  output: string;
  outputType: string;
  errorMessage: string;
  steps: IStep[];
}

export interface IStep {
  name: string;
  duration: string;
  status: string;
  assertionResults: IAssertionResult[];
}

export interface IAssertionResult {
  name: string;
  status: string;
  errorMessage: string;
}
