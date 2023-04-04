export enum SourceType {
  string = 'string',
  fileUri = 'file-uri',
  gitUri = 'git-uri', // TODO: Is it actually existent?
  gitFile = 'git-file', // deprecated
  gitDir = 'git-dir', // deprecated
  git = 'git',
}
export type GitSourceType = SourceType.gitUri | SourceType.gitFile | SourceType.gitDir | SourceType.git;

export const gitSourceTypes = [SourceType.git, SourceType.gitFile, SourceType.gitDir, SourceType.gitUri];
export const isGitSourceType = (type?: SourceType): type is GitSourceType => gitSourceTypes.includes(type!);
