import {TestTrigger, TriggersKeyMap} from '@models/triggers';

import {createSliceFactory} from '@store/utils';

interface TriggersSlice {
  triggersKeyMap?: TriggersKeyMap;
  currentTrigger?: TestTrigger;
  setTriggersKeyMap: (triggersKeyMap: TriggersKeyMap) => void;
  setCurrentTrigger: (trigger: TestTrigger) => void;
}

export const createTriggersSlice = createSliceFactory<TriggersSlice>(set => ({
  triggersKeyMap: undefined,
  currentTrigger: undefined,
  setTriggersKeyMap: (newTriggersKeyMap: TriggersKeyMap) => set({triggersKeyMap: newTriggersKeyMap}),
  setCurrentTrigger: (newTrigger: TestTrigger) => set({currentTrigger: newTrigger}),
}));
