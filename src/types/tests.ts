export type ITestStatus = {
  status: 'queued' | 'error' | 'success' | 'pending';
};

export interface ITests {
  id: number;
  name: string;
  scriptName: string;
  scriptType: string;
  status: ITestStatus;
  startTime: string;
  endTime: string;
}

export interface ITest {
  id: string;
  scriptName: string;
  scriptType: string;
  name: string;
  executionResult: IExecutionResult;
}

export interface IExecutionResult {
  status: string;
  startTime: string;
  endTime: string;
  output: string;
  outputType: string;
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
}
