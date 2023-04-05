// Internal input types

import {SourceType} from '@models';

export interface SourceInputExecutor {
  executor?: {
    contentTypes?: SourceType[];
    meta?: {
      iconURI: string;
    };
  };
}
