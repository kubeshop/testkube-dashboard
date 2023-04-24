import {AddTriggerOption} from '@models/triggers';

export const addTriggerOptions: AddTriggerOption[] = [
  {
    key: 'label-label',
    label: 'Labels to Labels',
    description: 'Identify your cluster and testkube resources by label',
  },
  {
    key: 'name-label',
    label: 'Name to Labels',
    description: 'Identify your cluster resource by name, your testkube resources by label',
  },
  {
    key: 'name-name',
    label: 'Name to Name',
    description: 'Identify your cluster and testkube resource by name',
  },
  {
    key: 'label-name',
    label: 'Labels to Name',
    description: 'Identify your cluster resources by labels, your testkube resource by name',
  },
];
