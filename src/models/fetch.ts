import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';

export type RTKResponse<T> =
  | {
      data: T;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export type MetadataResponse<Meta = {}> = {
  metadata: Meta;
  spec?: Meta;
};
