import {createPlugin} from '@testkube/plugins';

import {FeatureFlagsProvider, useFeatureFlag} from '@feature-flags';

export default createPlugin('dashboard/feature-flags')
  .order(-100)
  .provider(<FeatureFlagsProvider />)
  .data({useFeatureFlag})
  .init();
