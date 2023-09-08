import {Option} from '@models/form';
import {TestTrigger, TestTriggerSelector} from '@models/triggers';

import {decomposeLabels} from '@molecules/LabelsSelect/utils';

export const getResourceIdentifierSelector = (
  formValue: string | readonly Option[],
  appNamespace: string
): TestTriggerSelector => {
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

  if (formValue.length) {
    return {
      labelSelector: {
        matchLabels: decomposeLabels(formValue),
      },
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
  const resourceLabelSelector = currentLabelSelector?.matchLabels;

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
  const testLabelSelector = currentLabelSelector?.matchLabels;

  return {
    testNameSelector,
    testLabelSelector,
    action: `${action} ${execution}`,
  };
};
