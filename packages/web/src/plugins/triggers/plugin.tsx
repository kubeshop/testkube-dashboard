import {StoreProvider, createPlugin, external} from '@testkube/plugins';

import {ReactComponent as TriggersIcon} from '@assets/triggers.svg';

import TriggerDetails from '@pages/Triggers/TriggerDetails';
import TriggersList from '@pages/Triggers/TriggersList';

import type GeneralPlugin from '@plugins/general/plugin';
import RtkPlugin from '@plugins/rtk/plugin';

import {triggersApi} from '@services/triggers';

import {
  initializeTriggersStore,
  useTriggers,
  useTriggersField,
  useTriggersPick,
  useTriggersSync,
} from '@store/triggers';

const generalStub = external<typeof GeneralPlugin>();

export default createPlugin('oss/triggers')
  .needs(generalStub.slots('siderItems'))
  .needs(generalStub.data('useApiEndpoint'))

  .route('/triggers', <TriggersList />)
  .route('/triggers/:id', <TriggerDetails />)
  .route('/triggers/:id/settings/:settingsTab', <TriggerDetails />)

  .provider(({useData}) => (
    <StoreProvider store={initializeTriggersStore} dependencies={[useData.select(x => x.useApiEndpoint)()]} />
  ))
  .data({useTriggers, useTriggersPick, useTriggersField, useTriggersSync})

  .init(tk => {
    tk.slots.siderItems.add({path: '/triggers', icon: TriggersIcon, title: 'Triggers'}, {order: -60});
  });

RtkPlugin.overlay.appendContext({
  triggersApi,
});
