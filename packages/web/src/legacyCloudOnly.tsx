import {createPlugin, external} from '@testkube/plugins';

import {ReactComponent as SettingIcon} from '@icons/setting.svg';

import type LegacyPlugin from './legacy';

const legacyStub = external<typeof LegacyPlugin>();

export default createPlugin('web-legacy-cloud-only')
  .needs(legacyStub.slots('siderItems'))

  // Finish
  .init(tk => {
    // TODO: Separate in specific "Cloud Settings" plugin?
    tk.slots.siderItems.add(
      {
        path: '/settings',
        icon: SettingIcon,
        title: 'Settings',
        additionalClassName: 'settings-icon',
        active: /environment-management/,
      },
      {order: Infinity}
    );
  });
