import {ExecutionStatusEnum} from '@models/execution';

import useIsRunning from './useIsRunning';

describe('useIsRunning', () => {
  it('should return true when status is "running"', () => {
    const status: ExecutionStatusEnum = 'running';
    const isRunning = useIsRunning(status);
    expect(isRunning).toBe(true);
  });

  it('should return false when status is not "running"', () => {
    const status: ExecutionStatusEnum = 'failed';
    const isRunning = useIsRunning(status);
    expect(isRunning).toBe(false);
  });
});
