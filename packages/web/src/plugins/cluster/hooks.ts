import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useClusterPlugin = createUseData<typeof plugin>();
export const useClusterSlot = createUseSlot<typeof plugin>();
export const useClusterSlotFirst = createUseSlotFirst<typeof plugin>();
