import {StateCreator} from 'zustand';

import {TestTrigger, TriggersKeyMap} from '@models/triggers';

export interface TriggersSlice {
  triggersKeyMap?: TriggersKeyMap;
  currentTrigger?: TestTrigger;
  setTriggersKeyMap: (triggersKeyMap: TriggersKeyMap) => void;
  setCurrentTrigger: (trigger: TestTrigger) => void;
}

const createTriggersSlice: StateCreator<TriggersSlice> = set => ({
  triggersKeyMap: undefined,
  currentTrigger: undefined,
  setTriggersKeyMap: (newTriggersKeyMap: TriggersKeyMap) => set({triggersKeyMap: newTriggersKeyMap}),
  setCurrentTrigger: (newTrigger: TestTrigger) => set({currentTrigger: newTrigger}),
});

export default createTriggersSlice;
