const values = (window as any)._env_;

const env: Environment = {
  apiUrl: values?.REACT_APP_API_SERVER_ENDPOINT,
};

type Environment = {
  apiUrl: string;
};

export default env;
