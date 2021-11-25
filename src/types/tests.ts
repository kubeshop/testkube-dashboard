import { Moment } from "moment";

export enum EStatus {
  pending = 'pending',
  success = 'success',
  error = 'error',
}

export interface ITests {
  totals: Totals;
  results: IResult[];
  filtered: any;
}

export interface IResult {
  id: string;
  name: string;
  scriptName: string;
  scriptType: string;
  status: string;
  startTime: Moment;
  endTime: Moment;
}

export interface Totals {
  results: number;
  passed: number;
  failed: number;
  pending: number;
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
  errorMessage?: string;
}
