import {Variable} from '@models/variable';

export const formatVariables = (list: Variable[]) => {
  const variables: {[key in string]: any} = {};
  list.forEach(item => {
    variables[item.key] = {
      name: item.key,
      value: item.value,
      type: item.type === 0 ? 'basic' : 'secret',
      secretRef: {
        name: item.key,
        key: item.key,
        namescpace: item.key,
      },
    };
  });
  return variables;
};

export const decomposeVariables = (variables: any) => {
  if (!variables) {
    return [];
  }
  return Object.entries(variables).map(([key, value]: any[]) => ({
    ...value,
    key: value.name,
    type: value.type === 'basic' ? 0 : 1,
  }));
};
