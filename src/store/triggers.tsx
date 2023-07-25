import {TestTrigger, TriggersKeyMap} from '@models/triggers';

import {createSliceFactory} from '@store/utils';

interface TriggersSlice {
  triggersKeyMap?: TriggersKeyMap;
  currentTrigger?: TestTrigger;
}

export const createTriggersSlice = createSliceFactory<TriggersSlice>(set => ({
  triggersKeyMap: undefined,
  currentTrigger: undefined,
}));
