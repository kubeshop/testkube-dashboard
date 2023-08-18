import {applyUrlOverrides, getValue, renderOverridesIndicator} from './overrides';

// Load overrides
applyUrlOverrides();
renderOverridesIndicator();

// Obtain dynamic variables from server
export const provided = (window as any)._env_;

// Build-time variables
export const build: BuildTimeEnvironment = {
  gtmKey: getValue('REACT_APP_GTM_ID', process.env.REACT_APP_GTM_ID),
  version: getValue('REACT_APP_VERSION', process.env.REACT_APP_VERSION) || 'dev',
};

// Dynamic variables
export const dynamic: DynamicEnvironment = {
  apiUrl: getValue('REACT_APP_API_SERVER_ENDPOINT', provided?.REACT_APP_API_SERVER_ENDPOINT),
  basename: getValue('REACT_APP_ROOT_ROUTE', provided?.REACT_APP_ROOT_ROUTE),
  disableTelemetry: getValue('REACT_APP_DISABLE_TELEMETRY', provided?.REACT_APP_DISABLE_TELEMETRY) === 'true',
  crdOperatorRevision: getValue('REACT_APP_CRD_OPERATOR_REVISION', provided?.REACT_APP_CRD_OPERATOR_REVISION) || 'main',
  debugTelemetry:
    getValue('REACT_APP_DEBUG_TELEMETRY', provided?.REACT_APP_DEBUG_TELEMETRY) === 'true' ||
    process.env.NODE_ENV !== 'production',
};

export interface BuildTimeEnvironment {
  gtmKey?: string;
  version: string;
}

export interface DynamicEnvironment {
  apiUrl: string;
  basename: string;
  disableTelemetry: boolean;
  crdOperatorRevision: string;
  debugTelemetry: boolean;
}

export default {
  ...dynamic,
  ...build,
};
