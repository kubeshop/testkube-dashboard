import React from 'react';

import {createPlugin, external} from '@testkube/plugins';

import {GlobalSettings} from '@pages';

import type GeneralPlugin from '@plugins/general/plugin';

const generalStub = external<typeof GeneralPlugin>();

// TODO: Add routes
export default createPlugin('oss/settings')
  .needs(generalStub.slots('siderOtherItems'))
  .needs(generalStub.data('useDashboardNavigate'))

  .route('/settings', <GlobalSettings />)

  .init(tk => {
    const createOpenSettings = tk.sync(() => tk.data.useDashboardNavigate('/settings'));
    tk.slots.siderOtherItems.add(
      {
        icon: 'cog',
        title: 'Settings',
        onClick: () => createOpenSettings()!(),
        active: /^\/settings/,
      },
      {order: -100}
    );
  });
