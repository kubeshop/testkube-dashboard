import { EStatus, ITest } from "@src/types/tests";

import { Moment } from "moment";

export interface ITestTotals {
  results?: number,
  passed?: number,
  failed?: number,
  pending?: number
}

export interface ITestListState {
  isLoading?: boolean,
  hasNext?: boolean
  filters?: any,
  selectedTestId?: string | undefined,
  selectedTest?: ITest,
  results?: any
  resultsByStatus?: any,
  resultsByDate?: any,
  error?: any,
  totals: ITestTotals,
  filtered: ITestTotals
  status?: string;
}

export interface ITestFilter {
  pageSize?: number;
  page?: number;
  status?: Array<EStatus>;
  startDate?: Moment
  endDate?: Moment;
}
