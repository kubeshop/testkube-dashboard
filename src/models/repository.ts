export type RepositoryTypeEnum = 'git';

export type Repository = {
  type: RepositoryTypeEnum;
  uri?: string;
  branch?: string;
  commit?: string;
  path?: string;
  username?: string;
  token?: string;
  tokenSecret?: {
    namespace?: string;
    name: string;
    key?: string;
  };
  usernameSecret?: {
    namespace?: string;
    name: string;
    key?: string;
  };
  certificateSecret?: string;
  workingDir?: string;
  authType?: string;
};
