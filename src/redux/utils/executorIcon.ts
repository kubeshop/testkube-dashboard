import {Executor} from '@models/executors';

export const getTestExecutorIcon = (executors: Executor[], testType: string): string | undefined => {
  const currentExecutor = executors.find(executor => executor?.executor?.types?.includes(testType));
  return currentExecutor?.executor?.meta?.iconURI;
};
