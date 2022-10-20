import {BaseQueryFn, FetchArgs, FetchBaseQueryError, MutationDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';

export type UseMutationType = UseMutation<
  MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, {}>, never, void, any>
>;
