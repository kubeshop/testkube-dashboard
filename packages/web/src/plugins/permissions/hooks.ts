import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const usePermissionsPlugin = createUseData<typeof plugin>();
export const usePermissionsSlot = createUseSlot<typeof plugin>();
export const usePermissionsSlotFirst = createUseSlotFirst<typeof plugin>();
