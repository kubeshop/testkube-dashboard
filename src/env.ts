const values = (window as any)._env_;

// Build-time variables
const build: BuildTimeEnvironment = {
  posthogKey: process.env.REACT_APP_POSTHOG_KEY,
  segmentKey: process.env.REACT_APP_SEGMENT_KEY,
  ga4Key: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
};

// Dynamic variables
const env: DynamicEnvironment = {
  apiUrl: values?.REACT_APP_API_SERVER_ENDPOINT,
  basename: values?.REACT_APP_ROOT_ROUTE,
};

type BuildTimeEnvironment = {
  posthogKey?: string;
  segmentKey?: string;
  ga4Key?: string;
}

type DynamicEnvironment = {
  apiUrl: string;
  basename: string;
};

export default {
  ...env,
  ...build,
};
