import { ITest } from "@src/types/tests";
import { Moment } from "moment";

export enum EStatus {
  queued = 'queued',
  pending = 'pending',
  success = 'success',
  error = 'error',
}
export interface ITestsResults {
  id: string
  name: string
  scriptName: string
  scriptType: string
  status: EStatus
  startTime: Moment
  endTime: Moment
}
export interface ITestFilter {
  pageSize?: number;
  page?: number;
  status?: Array<EStatus>;
  startDate?: Moment
  endDate?: Moment;
}

export interface ITestList {
  totals: any;
  filtered: any;
  results: ITestsResults;
}
export interface TestListState {
  isLoading?: boolean,
  hasNext?: boolean
  filters?: any,
  selectedTestId?: string | undefined,
  selectedTest?: ITest,
  results?: any
  resultsByStatus?: any,
  resultsByDate?: any,
  error?: any,
  totals: {
    results?: number,
    passed?: number,
    failed?: number,
    queued?: number,
    pending?: number
  }
}
