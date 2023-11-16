import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useRtkPlugin = createUseData<typeof plugin>();
export const useRtkSlot = createUseSlot<typeof plugin>();
export const useRtkSlotFirst = createUseSlotFirst<typeof plugin>();
