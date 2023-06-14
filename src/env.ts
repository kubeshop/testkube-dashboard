import {applyUrlOverrides, getValue, renderOverridesIndicator} from './overrides';

// Load overrides
applyUrlOverrides();
renderOverridesIndicator();

// Obtain dynamic variables from server
const values = (window as any)._env_;

// Build-time variables
const build: BuildTimeEnvironment = {
  posthogKey: getValue('REACT_APP_POSTHOG_KEY', process.env.REACT_APP_POSTHOG_KEY),
  segmentKey: getValue('REACT_APP_SEGMENT_KEY', process.env.REACT_APP_SEGMENT_KEY),
  ga4Keys: (getValue('REACT_APP_GOOGLE_ANALYTICS_ID', process.env.REACT_APP_GOOGLE_ANALYTICS_ID) || '')
    .split(',')
    .map(key => key.trim())
    .filter(Boolean),
  version: getValue('REACT_APP_VERSION', process.env.REACT_APP_VERSION) || 'dev',
};

// Dynamic variables
const env: DynamicEnvironment = {
  apiUrl: getValue('REACT_APP_API_SERVER_ENDPOINT', values?.REACT_APP_API_SERVER_ENDPOINT),
  basename: getValue('REACT_APP_ROOT_ROUTE', values?.REACT_APP_ROOT_ROUTE),
  disableTelemetry: getValue('REACT_APP_DISABLE_TELEMETRY', values?.REACT_APP_DISABLE_TELEMETRY) === 'true',
};

type BuildTimeEnvironment = {
  posthogKey?: string;
  segmentKey?: string;
  ga4Keys: string[];
  version: string;
};

type DynamicEnvironment = {
  apiUrl: string;
  basename: string;
  disableTelemetry: boolean;
};

export default {
  ...env,
  ...build,
};
