const values = (window as any)._env_;

const env: Environment = {
  apiUrl: values?.REACT_APP_API_SERVER_ENDPOINT,
  ga: values?.REACT_APP_GOOGLE_ANALYTICS_ID,
};

type Environment = {
  apiUrl: string;
  ga: string;
};

export default env;
