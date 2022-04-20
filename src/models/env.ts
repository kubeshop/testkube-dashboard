export type EnvKey = string;
export type EnvValue = string;

export type Env = {
  key: EnvKey;
  value: EnvValue;
};

export type EnvMap = Record<EnvKey, EnvValue>;

export type EnvArray = Env[];
