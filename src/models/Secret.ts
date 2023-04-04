import {Expose, Transform} from 'class-transformer';
import {MinLength} from 'class-validator';

export class Secret {
  @Expose()
  @Transform(({value}) => (value || undefined))
  namespace?: string;

  @Expose()
  @MinLength(1, {message: 'Required.'})
  name!: string;

  @Expose()
  @Transform(({value}) => (value || undefined))
  key?: string;
}
