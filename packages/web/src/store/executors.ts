import {capitalize} from 'lodash';
import {StateCreator} from 'zustand';

import {Executor, ExecutorFeature} from '@models/executors';

import {isURL} from '@utils/strings';

import {connectStore, createStoreFactory} from './utils';

interface ExecutorsSlice {
  executors?: Executor[];
  current?: Executor;
  featuresMap: Record<string, ExecutorFeature[]>;
  setExecutors(executors: Executor[]): void;
}

const createExecutorsSlice: StateCreator<ExecutorsSlice> = set => ({
  executors: undefined,
  current: undefined,
  featuresMap: {},

  setExecutors(rawExecutors): void {
    const executors = rawExecutors?.map(executor => {
      const iconURI = executor.executor?.meta?.iconURI;
      if (!iconURI || isURL(iconURI)) {
        return {...executor, displayName: capitalize(iconURI)};
      }
      return {...executor, displayName: executor.name};
    });
    const featuresMap: Record<string, ExecutorFeature[]> = (executors || []).reduce(
      (acc, {executor: {features, types}}) => types.reduce((acc2, type) => ({...acc2, [type]: features || []}), acc),
      {}
    );
    set({executors, featuresMap});
  },
});

const createExecutorsStore = createStoreFactory('Executors', createExecutorsSlice);

export const {
  use: useExecutors,
  useField: useExecutorsField,
  pick: useExecutorsPick,
  sync: useExecutorsSync,
  init: initializeExecutorsStore,
} = connectStore(createExecutorsStore);
