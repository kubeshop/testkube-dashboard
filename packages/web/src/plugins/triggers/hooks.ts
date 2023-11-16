import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useTriggersPlugin = createUseData<typeof plugin>();
export const useTriggersSlot = createUseSlot<typeof plugin>();
export const useTriggersSlotFirst = createUseSlotFirst<typeof plugin>();
