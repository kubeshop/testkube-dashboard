import {createTriggersSlice} from '@store/triggers';
import {connectStore, createStoreBuilder} from '@store/utils';

const createStore = createStoreBuilder('Dashboard').with(createTriggersSlice).end();

export const {
  use: useMain,
  useSetter: useMainSetter,
  useField: useMainField,
  pick: useMainPick,
  sync: useMainSync,
  init: initializeMainStore,
} = connectStore(createStore);
