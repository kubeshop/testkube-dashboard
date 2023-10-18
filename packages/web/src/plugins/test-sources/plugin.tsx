import {StoreProvider, createPlugin, external} from '@testkube/plugins';

import {ReactComponent as SourcesIcon} from '@assets/sources.svg';

import type GeneralPlugin from '@plugins/general/plugin';

import {initializeSourcesStore, useSources, useSourcesField, useSourcesPick, useSourcesSync} from '@store/sources';

const generalStub = external<typeof GeneralPlugin>();

// TODO: Add routes
export default createPlugin('oss/test-sources')
  .needs(generalStub.slots('siderItems'))
  .needs(generalStub.data('useApiEndpoint'))
  .provider(tk => <StoreProvider store={initializeSourcesStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useSources, useSourcesPick, useSourcesField, useSourcesSync})

  .init(tk => {
    tk.slots.siderItems.add({path: '/sources', icon: SourcesIcon, title: 'Sources'}, {order: -20});
  });
