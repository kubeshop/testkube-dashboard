import {Expose, Transform} from 'class-transformer';

import {IsGitBranchName} from '@validators';
import {Secret} from '@models/Secret';

export class CustomRepository {
  @Expose()
  @Transform(() => '')
  type: string = '';

  @Expose()
  @Transform(() => '')
  uri: string = '';

  @Expose()
  @IsGitBranchName()
  @Transform(({value}) => (value || ''))
  branch!: string;

  @Expose()
  @Transform(({value}) => (value || ''))
  path?: string;

  username?: string;
  token?: string;
  usernameSecret?: Secret;
  tokenSecret?: Secret;
}
