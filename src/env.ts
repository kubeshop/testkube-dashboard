const values = (window as any)._env_;

const env: Environment = {
  apiUrl: values?.REACT_APP_API_SERVER_ENDPOINT,
  basename: values?.REACT_APP_ROOT_ROUTE,
};

type Environment = {
  apiUrl: string;
  basename: string;
};

export default env;
