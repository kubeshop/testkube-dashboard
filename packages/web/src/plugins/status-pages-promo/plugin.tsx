import {createPlugin, external} from '@testkube/plugins';

import {ReactComponent as StatusPageIcon} from '@assets/status-page-icon.svg';

import type GeneralPlugin from '@plugins/general/plugin';

import StatusPagesPromoPage from './components/StatusPagesPromoPage';

const generalStub = external<typeof GeneralPlugin>();

export default createPlugin('oss/status-pages-promo')
  .needs(generalStub.slots('siderItems'))
  .route('/status-page', <StatusPagesPromoPage />)
  .init(tk => {
    tk.slots.siderItems.add({
      path: '/status-page',
      title: 'Status Page',
      icon: StatusPageIcon,
      active: /status-page/,
    });
  });
