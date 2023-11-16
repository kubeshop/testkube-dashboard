import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useSourcesPlugin = createUseData<typeof plugin>();
export const useSourcesSlot = createUseSlot<typeof plugin>();
export const useSourcesSlotFirst = createUseSlotFirst<typeof plugin>();
