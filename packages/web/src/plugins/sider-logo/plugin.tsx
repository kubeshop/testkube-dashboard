import {ReactNode} from 'react';

import {config, createPlugin, external} from '@testkube/plugins';

import GeneralPlugin from '@plugins/general/plugin';

const generalStub = external<typeof GeneralPlugin>();

export default createPlugin('dashboard/sider-logo')
  .needs(generalStub.slots('siderLogo'))
  .define(config<ReactNode>()('logo'))

  .init((tk, cfg) => {
    tk.slots.siderLogo.add(cfg.logo);
  });
