import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useConfigPlugin = createUseData<typeof plugin>();
export const useConfigSlot = createUseSlot<typeof plugin>();
export const useConfigSlotFirst = createUseSlotFirst<typeof plugin>();
