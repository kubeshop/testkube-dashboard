import {useMemo} from 'react';

import {createPlugin, external} from '@testkube/plugins';

import type GeneralPlugin from '@plugins/general/plugin';
import type RtkPlugin from '@plugins/rtk/plugin';

const generalStub = external<typeof GeneralPlugin>();
const rtkStub = external<typeof RtkPlugin>();

export default createPlugin('oss/rtk-reset-on-api-change')
  .needs(generalStub.data('useApiEndpoint'))
  .needs(rtkStub.data('resetRtkCache'))

  .init(tk => {
    // Reset the in-memory API cache on API endpoint change
    tk.sync(() => {
      const {resetRtkCache, useApiEndpoint} = tk.data;
      useMemo(resetRtkCache, [useApiEndpoint()]);
    });
  });
