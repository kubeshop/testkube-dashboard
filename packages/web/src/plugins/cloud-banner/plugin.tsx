import {createPlugin, external} from '@testkube/plugins';

import type GeneralPlugin from '@plugins/general/plugin';

const generalStub = external<typeof GeneralPlugin>();

export default createPlugin('oss/cloud-banner')
  .needs(generalStub.slots('banners'))

  .init(tk => {
    tk.slots.banners.add({
      key: 'isTestkubeCloudLaunchBannerHidden',
      type: 'default',
      title: '🎉 We have just launched Testkube Cloud! 🎉',
      description:
        'One centralized place for all your local Testkube instances. Fully integrated users, roles and permissions - and much more...',
      buttons: [
        {
          type: 'secondary',
          text: 'Learn more',
          isLink: true,
          linkConfig: {
            href: 'https://testkube.io/get-started',
            target: '_blank',
          },
        },
        {
          type: 'primary',
          text: 'Connect to Testkube Cloud',
          isLink: true,
          linkConfig: {
            href: 'https://cloud.testkube.io/system-init?cloudMigrate=true',
            target: '_blank',
          },
        },
      ],
    });
  });
