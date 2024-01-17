import {Navigate} from 'react-router-dom';

import {createPlugin, external} from '@testkube/plugins';

import type GeneralStub from '@plugins/general/plugin';

const generalStub = external<typeof GeneralStub>();

export default createPlugin('dashboard/default-route')
  .needs(generalStub.slots('siderItems'))
  .route('/', tk => <Navigate to={tk.slots.siderItems.first()?.path || '/tests'} replace />)

  .init();
