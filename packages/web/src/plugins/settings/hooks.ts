import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useSettingsPlugin = createUseData<typeof plugin>();
export const useSettingsSlot = createUseSlot<typeof plugin>();
export const useSettingsSlotFirst = createUseSlotFirst<typeof plugin>();
