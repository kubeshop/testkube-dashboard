export type ITestStatus = {
  status: 'queued' | 'error' | 'success' | 'pending';
};

export interface ITests {
  'end-time': string;
  executionresults: string;
  id: number;
  'script-name': string;
  'script-type': string;
  'start-time': string;
  status: ITestStatus;
}
