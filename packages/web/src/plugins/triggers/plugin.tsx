import {StoreProvider, createPlugin, external} from '@testkube/plugins';

import {ReactComponent as TriggersIcon} from '@assets/triggers.svg';

import TriggerDetails from '@pages/Triggers/TriggerDetails';
import TriggersList from '@pages/Triggers/TriggersList';

import type GeneralPlugin from '@plugins/general/plugin';
import type RtkPlugin from '@plugins/rtk/plugin';
import {RtkService} from '@plugins/rtk/plugin';

import {triggersApi} from '@services/triggers';

import {
  initializeTriggersStore,
  useTriggers,
  useTriggersField,
  useTriggersPick,
  useTriggersSync,
} from '@store/triggers';

const generalStub = external<typeof GeneralPlugin>();
const rtkStub = external<typeof RtkPlugin>();

export default createPlugin('oss/triggers')
  .needs(generalStub.slots('siderItems'))
  .needs(generalStub.data('useApiEndpoint'))
  .needs(rtkStub.slots('rtkServices'))

  .route('/triggers', <TriggersList />)
  .route('/triggers/:id', <TriggerDetails />)
  .route('/triggers/:id/settings/:settingsTab', <TriggerDetails />)

  .provider(({useData}) => (
    <StoreProvider store={initializeTriggersStore} dependencies={[useData.select(x => x.useApiEndpoint)()]} />
  ))
  .data({useTriggers, useTriggersPick, useTriggersField, useTriggersSync})

  .init(tk => {
    tk.slots.rtkServices.add(triggersApi, {}, (object: RtkService) => object.reducerPath === 'triggersApi');
    tk.slots.siderItems.add({path: '/triggers', icon: TriggersIcon, title: 'Triggers'}, {order: -60});
  });
