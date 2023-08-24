import type {ExecutionStatusEnum} from '@models/execution';

export const useIsRunning = (status: ExecutionStatusEnum) => {
  return status === 'running';
};
