import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useGeneralPlugin = createUseData<typeof plugin>();
export const useGeneralSlot = createUseSlot<typeof plugin>();
export const useGeneralSlotFirst = createUseSlotFirst<typeof plugin>();
