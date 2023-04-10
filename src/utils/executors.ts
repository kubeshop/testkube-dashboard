import {Executor} from '@models/executors';
import {Option} from '@models/form';

export const remapExecutors = (executors: Executor[]): Option[] => {
  const array: Option[] = [];

  executors.forEach(executorItem => {
    const {
      executor: {types, executorType},
    } = executorItem;

    if (types) {
      array.push(...types.map(type => ({label: type, value: type})));
    } else if (executorType) {
      array.push({label: executorType, value: executorType});
    }
  });

  return array;
};
