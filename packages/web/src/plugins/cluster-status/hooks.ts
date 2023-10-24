import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useClusterStatusPlugin = createUseData<typeof plugin>();
export const useClusterStatusSlot = createUseSlot<typeof plugin>();
export const useClusterStatusSlotFirst = createUseSlotFirst<typeof plugin>();
