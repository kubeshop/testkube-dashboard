import {Option} from '@models/form';
import {TestTriggerSelector} from '@models/triggers';

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
