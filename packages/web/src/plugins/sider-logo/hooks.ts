import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useSiderLogoPlugin = createUseData<typeof plugin>();
export const useSiderLogoSlot = createUseSlot<typeof plugin>();
export const useSiderLogoSlotFirst = createUseSlotFirst<typeof plugin>();
