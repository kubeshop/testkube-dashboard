import {createPlugin, external} from '@testkube/plugins';

import type GeneralPlugin from '@plugins/general/plugin';

import {externalLinks} from '@utils/externalLinks';

const generalStub = external<typeof GeneralPlugin>();

export default createPlugin('oss/sider-cloud-migrate')
  .needs(generalStub.slots('siderOtherItems'))

  .init(tk => {
    tk.slots.siderOtherItems.add({
      icon: 'cloudMigrate',
      title: 'Connect to Testkube Cloud',
      size: 32,
      onClick: () => window.open(externalLinks.OSStoCloudMigration),
    });
  });
