import {ExecutionStatusEnum} from '@models/execution';

const useIsRunning = (status: ExecutionStatusEnum) => {
  return status === 'running';
};

export default useIsRunning;
