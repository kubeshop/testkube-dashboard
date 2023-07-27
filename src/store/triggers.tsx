import {StateCreator} from 'zustand';

import {TestTrigger, TriggersKeyMap} from '@models/triggers';

import {connectStore, createStoreFactory} from '@store/utils';

interface TriggersSlice {
  keyMap?: TriggersKeyMap;
  current?: TestTrigger;
}

const createTriggersSlice: StateCreator<TriggersSlice> = set => ({
  keyMap: undefined,
  current: undefined,
});

const createTriggersStore = createStoreFactory('Triggers', createTriggersSlice);

export const {
  use: useTriggers,
  useSetter: useTriggersSetter,
  useField: useTriggersField,
  pick: useTriggersPick,
  sync: useTriggersSync,
  init: initializeTriggersStore,
} = connectStore(createTriggersStore);
