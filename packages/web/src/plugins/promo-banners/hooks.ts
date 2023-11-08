import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const usePromoBannersPlugin = createUseData<typeof plugin>();
export const usePromoBannersSlot = createUseSlot<typeof plugin>();
export const usePromoBannersSlotFirst = createUseSlotFirst<typeof plugin>();
