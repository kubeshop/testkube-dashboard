import {Variable, Variables} from '@models/variable';

export const formatVariables = (list: Variable[]) => {
  const variables: {
    [key in string]: {
      name: string;
      value: string;
      type: string;
    };
  } = {};

  list.forEach(item => {
    variables[item.key] = {
      name: item.key,
      value: item.value,
      type: item.type === 0 ? 'basic' : 'secret',
    };
  });

  return variables;
};

export const decomposeVariables = (variables: Variables) => {
  if (!variables) {
    return [];
  }

  return Object.entries(variables).map(([key, value]: any) => ({
    ...value,
    key: value?.name,
    type: value.type === 'basic' ? 0 : 1,
  }));
};
