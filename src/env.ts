const values = (window as any)._env_;

const env: Environment = {
  apiUrl: values?.REACT_APP_API_SERVER_ENDPOINT,
  basename: values?.REACT_APP_ROOT_ROUTE,
  ga4Key: values?.REACT_APP_GOOGLE_ANALYTICS_ID,
};

type Environment = {
  apiUrl: string;
  basename: string;
  ga4Key?: string;
};

export default env;
