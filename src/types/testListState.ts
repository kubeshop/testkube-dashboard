import { EStatus, ITest } from "@src/types/tests";

import { Moment } from "moment";

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
  totals: {
    results?: number,
    passed?: number,
    failed?: number,
    queued?: number,
    pending?: number
  }
  // toggleDrawer: boolean
}

export interface ITestFilter {
  pageSize?: number;
  page?: number;
  status?: Array<EStatus>;
  startDate?: Moment
  endDate?: Moment;
}
