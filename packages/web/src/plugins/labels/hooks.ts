import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useLabelsPlugin = createUseData<typeof plugin>();
export const useLabelsSlot = createUseSlot<typeof plugin>();
export const useLabelsSlotFirst = createUseSlotFirst<typeof plugin>();
