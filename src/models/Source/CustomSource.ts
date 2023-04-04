import {MinLength} from 'class-validator';
import {Expose} from 'class-transformer';

import {Source} from './Source';

export class CustomSource extends Source {
  @Expose()
  @MinLength(1, {message: 'Required.'})
  name!: string;
}
