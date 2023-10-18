import {StoreProvider, createPlugin, external} from '@testkube/plugins';

import {ReactComponent as SourcesIcon} from '@assets/sources.svg';

import SourceDetails from '@pages/Sources/SourceDetails';
import SourcesList from '@pages/Sources/SourcesList/SourcesList';

import type GeneralPlugin from '@plugins/general/plugin';

import {initializeSourcesStore, useSources, useSourcesField, useSourcesPick, useSourcesSync} from '@store/sources';

const generalStub = external<typeof GeneralPlugin>();

export default createPlugin('oss/test-sources')
  .needs(generalStub.slots('siderItems'))
  .needs(generalStub.data('useApiEndpoint'))

  .route('/sources', <SourcesList />)
  .route('/sources/:id', <SourceDetails />)
  .route('/sources/:id/settings/:settingsTab', <SourceDetails />)

  .provider(tk => <StoreProvider store={initializeSourcesStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useSources, useSourcesPick, useSourcesField, useSourcesSync})

  .init(tk => {
    tk.slots.siderItems.add({path: '/sources', icon: SourcesIcon, title: 'Sources'}, {order: -20});
  });
