import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useFeatureFlagsPlugin = createUseData<typeof plugin>();
export const useFeatureFlagsSlot = createUseSlot<typeof plugin>();
export const useFeatureFlagsSlotFirst = createUseSlotFirst<typeof plugin>();
