import {Executor} from '@models/executors';
import {Option} from '@models/form';

export const remapExecutors = (executors: Executor[]): Option[] => {
  if (!executors || !executors.length) {
    return [];
  }

  const array: Option[] = [];

  executors.forEach(executorItem => {
    const {
      executor: {types, executorType},
    } = executorItem;

    if (types) {
      types.forEach(type => {
        array.push({label: type, value: type});
      });
    } else if (executorType) {
      array.push({label: executorType, value: executorType});
    }
  });

  return array;
};
