import {Expose} from 'class-transformer';

import {Source} from './Source';
import {CustomSource} from './CustomSource';

export class SourceWithRef extends Source {
  @Expose()
  $ref?: CustomSource;
}
