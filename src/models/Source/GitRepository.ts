import {Expose, Transform, Type} from 'class-transformer';
import {IsIn, IsOptional, IsUrl, MinLength, ValidateNested} from 'class-validator';

import {IsGitBranchName} from '@validators';

import {Secret} from '@models/Secret';

import {gitSourceTypes} from './SourceType';

export class GitRepository {
  @Expose()
  @IsIn(gitSourceTypes)
  @Transform(({value}) => (value || 'git'))
  type: string = 'git';

  @Expose()
  @IsUrl({}, {message: 'It should be a valid URI.'})
  @MinLength(1, {message: 'Required.'})
  uri!: string;

  @Expose()
  @IsGitBranchName()
  @MinLength(1, {message: 'Required.'})
  branch!: string;

  @Expose()
  @IsOptional()
  @Transform(({value}) => (value || undefined))
  path?: string;

  @Expose()
  @IsOptional()
  @Transform(({value}) => (value || undefined))
  username?: string;

  @Expose()
  @IsOptional()
  @Transform(({value}) => (value || undefined))
  token?: string;

  @Expose()
  @ValidateNested()
  @IsOptional()
  @Type(() => Secret)
  usernameSecret?: Secret;

  @Expose()
  @ValidateNested()
  @IsOptional()
  @Type(() => Secret)
  tokenSecret?: Secret;
}
