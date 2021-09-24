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
  executionResult: ExecutionResult;
}

export interface ExecutionResult {
  status: string;
  startTime: string;
  endTime: string;
  output: string;
  outputType: string;
  steps: Step[];
}

export interface Step {
  name: string;
  duration: string;
  status: string;
  assertionResults: AssertionResult[];
}

export interface AssertionResult {
  name: string;
  status: string;
}
