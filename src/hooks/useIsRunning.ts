import {ExecutionResultStatusEnum} from '@models/execution';

const useIsRunning = (status: ExecutionResultStatusEnum) => {
  return status === 'running';
};

export default useIsRunning;
