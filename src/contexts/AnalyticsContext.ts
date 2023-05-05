import {createContext} from 'react';

import {AnalyticsBrowser} from '@segment/analytics-next';

export type AnalyticsTrackData = {
  uiEvent?: string;
  duration?: number;
  page?: string;
  type?: string;
};

const AnalyticsContext = createContext<{
  analytics?: AnalyticsBrowser;
  analyticsTrack: (type: string, data: AnalyticsTrackData) => void;
  featureFlags?: string[];
}>(undefined!);

export default AnalyticsContext;
