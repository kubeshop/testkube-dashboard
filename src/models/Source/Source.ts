import {Expose, Transform, Type} from 'class-transformer';
import {IsEnum, IsUrl, MinLength, ValidateIf, ValidateNested} from 'class-validator';

import {SourceType, isGitSourceType} from './SourceType';
import {CustomRepository} from './CustomRepository';
import {GitRepository} from './GitRepository';

export class Source {
  @Expose()
  @IsEnum(SourceType)
  type!: SourceType;

  @Expose()
  @MinLength(1, {message: 'Required.'})
  @ValidateIf(({type}) => type === SourceType.string)
  @Transform(({value, obj}) => obj.type === SourceType.string ? value || '' : undefined)
  data?: string;

  @Expose()
  @IsUrl({}, {message: 'It should be a valid URI.'})
  @MinLength(1, {message: 'Required.'})
  @ValidateIf(({type}) => type === SourceType.fileUri)
  @Transform(({value, obj}) => obj.type === SourceType.fileUri ? value || '' : undefined)
  uri?: string;

  @Expose()
  @ValidateIf(({type}) => isGitSourceType(type))
  @ValidateNested()
  @Type(({object}: any) => object.$ref ? CustomRepository : GitRepository)
  @Transform(({value, obj}) => isGitSourceType(obj?.type) ? value : undefined)
  repository?: CustomRepository | GitRepository;
}
