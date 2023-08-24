import type {VariableInForm, Variables} from '@models/variable';

export const formatVariables = (list: VariableInForm[]) => {
  const variables: Variables = {};

  list.forEach(item => {
    if (item.secretRefName && item.secretRefKey && item.type === 'secretRef') {
      variables[item.key] = {
        name: item.key,
        type: 'secret',
        secretRef: {
          name: item.secretRefName,
          key: item.secretRefKey,
        },
      };
    } else {
      variables[item.key] = {
        name: item.key,
        value: item.value,
        type: item.type === 0 ? 'basic' : 'secret',
      };
    }
  });

  return variables;
};

export const decomposeVariables = (variables: Variables): VariableInForm[] => {
  if (!variables) {
    return [];
  }

  return Object.entries(variables).map(([key, value]) => {
    if (value.secretRef) {
      return {
        key: value.name,
        type: 'secretRef',
        secretRefName: value.secretRef.name,
        secretRefKey: value.secretRef.key,
        name: value.name,
      };
    }

    let formattedValue = null;

    if (typeof value.value !== 'string') {
      formattedValue = '';
    } else if (value.value.startsWith('"') && value.value.endsWith('"')) {
      formattedValue = value.value.substring(1, value.value.length - 1);
    } else {
      formattedValue = value.value;
    }

    return {
      ...value,
      value: formattedValue,
      key: value.name,
      type: value.type === 'basic' ? 0 : 1,
      name: value.name,
    };
  });
};
