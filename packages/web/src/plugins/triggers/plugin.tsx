import {StoreProvider, createPlugin, external} from '@testkube/plugins';

import {ReactComponent as TriggersIcon} from '@assets/triggers.svg';

import type GeneralPlugin from '@plugins/general/plugin';

import {
  initializeTriggersStore,
  useTriggers,
  useTriggersField,
  useTriggersPick,
  useTriggersSync,
} from '@store/triggers';

const generalStub = external<typeof GeneralPlugin>();

// TODO: Add routes
export default createPlugin('oss/triggers')
  .needs(generalStub.slots('siderItems'))
  .needs(generalStub.data('useApiEndpoint'))
  .provider(tk => <StoreProvider store={initializeTriggersStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useTriggers, useTriggersPick, useTriggersField, useTriggersSync})

  .init(tk => {
    tk.slots.siderItems.add({path: '/triggers', icon: TriggersIcon, title: 'Triggers'}, {order: -60});
  });
