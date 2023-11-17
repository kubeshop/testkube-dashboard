import {createPlugin} from '@testkube/plugins';

import About from '@pages/About';

export default createPlugin('dashboard/about')
  .route('/about', <About />)
  .init();
