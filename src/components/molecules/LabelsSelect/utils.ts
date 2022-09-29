import {Option} from '@models/form';

export const decomposeLabels = (labels: readonly Option[]) => {
  return labels.reduce((previousValue: any, currentValue: Option) => {
    const labelString = currentValue.value;

    if (typeof labelString === 'string' && labelString.includes(':')) {
      const [key, ...rest] = labelString.split(':');
      return {
        ...previousValue,
        [key.trim()]: rest.join(':').trim(),
      };
    }

    return {
      ...previousValue,
      [labelString]: '',
    };
  }, {});
};
