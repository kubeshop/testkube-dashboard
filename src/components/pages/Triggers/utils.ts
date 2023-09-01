import {TestTrigger, TestTriggerSelector} from '@models/triggers';

import {composeLabels, decomposeLabels} from '@molecules/LabelsSelect/utils';

export const getResourceIdentifierSelector = (
  formValue: string | string[],
  appNamespace: string
): TestTriggerSelector => {
  if (Array.isArray(formValue)) {
    return {
      labelSelector: {
        matchLabels: decomposeLabels(formValue),
      },
    };
  }

  if (typeof formValue === 'string') {
    if (formValue.includes('/')) {
      const [namespace, name] = formValue.split('/');

      return {
        name,
        namespace,
      };
    }

    return {
      name: formValue,
      namespace: appNamespace,
    };
  }

  // eslint-disable-next-line no-throw-literal
  throw 'Resource validation error';
};

export const getConditionFormValues = (trigger: TestTrigger) => {
  const {
    resourceSelector: {name, namespace, labelSelector: currentLabelSelector},
    resource,
    event,
  } = trigger;
  const resourceNameSelector = name && namespace ? `${namespace}/${name}` : null;
  const resourceLabelSelector = composeLabels(currentLabelSelector?.matchLabels);

  return {
    resource,
    event,
    resourceNameSelector,
    resourceLabelSelector,
  };
};

export const getActionFormValues = (trigger: TestTrigger) => {
  const {
    testSelector: {name, labelSelector: currentLabelSelector},
    action,
    execution,
  } = trigger;
  const testNameSelector = name;
  const testLabelSelector = composeLabels(currentLabelSelector?.matchLabels);

  return {
    testNameSelector,
    testLabelSelector,
    action: `${action} ${execution}`,
  };
};
