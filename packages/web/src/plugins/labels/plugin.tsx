import {createPlugin, external} from '@testkube/plugins';

import type RtkPlugin from '@plugins/rtk/plugin';

import {labelsApi} from '@services/labels';

const rtkStub = external<typeof RtkPlugin>();

export default createPlugin('oss/labels')
  .needs(rtkStub.slots('rtkServices'))

  .init(tk => {
    tk.slots.rtkServices.add(labelsApi);
  });
