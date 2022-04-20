export type RepositoryTypeEnum = 'git';

export type Repository = {
  type: RepositoryTypeEnum;
  uri: string;
  branch: string;
  path: string;
  username: string;
  token: string;
};
