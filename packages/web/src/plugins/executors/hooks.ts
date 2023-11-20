import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useExecutorsPlugin = createUseData<typeof plugin>();
export const useExecutorsSlot = createUseSlot<typeof plugin>();
export const useExecutorsSlotFirst = createUseSlotFirst<typeof plugin>();
