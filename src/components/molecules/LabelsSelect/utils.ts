import {Option} from '@models/form';

export const decomposeLabels = (labels: readonly Option[]): Record<string, string> => {
  return labels.reduce((previousValue, currentValue: Option) => {
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

export const composeLabels = (labelsObject?: Record<string, string> | Option[]): Option[] => {
  return Object.entries(labelsObject || {}).map(([key, value]) => {
    if (value.label && value.value && value.value === value.label) {
      return value;
    }
    const labelString = `${key}${value ? `:${value}` : ''}`;

    return {
      label: labelString,
      value: labelString,
    };
  });
};
