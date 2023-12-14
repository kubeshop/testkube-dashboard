export type SecretRef = {
  namespace?: string;
  name: string;
  key: string;
};

export type ApiSecret = {
  name: string;
  keys: string[];
};

export type Secret = {
  name: string;
  key: string;
};
