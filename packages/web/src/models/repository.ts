import {SecretRef} from './secretRef';

export type RepositoryTypeEnum = 'git';

export type Repository = {
  type: RepositoryTypeEnum;
  uri?: string;
  branch?: string;
  commit?: string;
  path?: string;
  username?: string;
  token?: string;
  tokenSecret?: Partial<SecretRef>;
  usernameSecret?: Partial<SecretRef>;
  certificateSecret?: string;
  workingDir?: string;
  authType?: string;
};
