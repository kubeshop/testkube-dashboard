import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useRtkResetOnApiChangePlugin = createUseData<typeof plugin>();
export const useRtkResetOnApiChangeSlot = createUseSlot<typeof plugin>();
export const useRtkResetOnApiChangeSlotFirst = createUseSlotFirst<typeof plugin>();
