import {createContext} from 'react';

import {AnalyticsBrowser} from '@segment/analytics-next';

const AnalyticsContext = createContext<{
  analytics?: AnalyticsBrowser;
  analyticsTrack: (type: string, data: any) => void;
  featureFlags: string[];
}>(undefined!);

export default AnalyticsContext;
