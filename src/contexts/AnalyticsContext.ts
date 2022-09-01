import {createContext} from 'react';

import {AnalyticsBrowser} from '@segment/analytics-next';

const AnalyticsContext = createContext<AnalyticsBrowser>(undefined!);

export default AnalyticsContext;
