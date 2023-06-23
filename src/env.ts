import {applyUrlOverrides, getValue, renderOverridesIndicator} from './overrides';

// Load overrides
applyUrlOverrides();
renderOverridesIndicator();

// Obtain dynamic variables from server
export const provided = (window as any)._env_;

// Build-time variables
export const build: BuildTimeEnvironment = {
  posthogKey: getValue('REACT_APP_POSTHOG_KEY', process.env.REACT_APP_POSTHOG_KEY),
  segmentKey: getValue('REACT_APP_SEGMENT_KEY', process.env.REACT_APP_SEGMENT_KEY),
  gtmKey: getValue('REACT_APP_GOOGLE_ANALYTICS_ID', process.env.REACT_APP_GOOGLE_ANALYTICS_ID),
  version: getValue('REACT_APP_VERSION', process.env.REACT_APP_VERSION) || 'dev',
};

// Dynamic variables
export const dynamic: DynamicEnvironment = {
  apiUrl: getValue('REACT_APP_API_SERVER_ENDPOINT', provided?.REACT_APP_API_SERVER_ENDPOINT),
  basename: getValue('REACT_APP_ROOT_ROUTE', provided?.REACT_APP_ROOT_ROUTE),
  disableTelemetry: getValue('REACT_APP_DISABLE_TELEMETRY', provided?.REACT_APP_DISABLE_TELEMETRY) === 'true',
  crdOperatorRevision: getValue('REACT_APP_CRD_OPERATOR_REVISION', provided?.REACT_APP_CRD_OPERATOR_REVISION) || 'main',
};

export interface BuildTimeEnvironment {
  posthogKey?: string;
  segmentKey?: string;
  gtmKey?: string;
  version: string;
}

export interface DynamicEnvironment {
  apiUrl: string;
  basename: string;
  disableTelemetry: boolean;
  crdOperatorRevision: string;
}

export default {
  ...dynamic,
  ...build,
};
