export type ITestStatus = {
  status: 'queued' | 'error' | 'success' | 'pending';
};

export interface ITests {
  id: number;
  scriptName: string;
  scriptType: string;
  startTime: string;
  endTime: string;
  status: ITestStatus;
}
