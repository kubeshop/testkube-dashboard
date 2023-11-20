import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useTestsPlugin = createUseData<typeof plugin>();
export const useTestsSlot = createUseSlot<typeof plugin>();
export const useTestsSlotFirst = createUseSlotFirst<typeof plugin>();
