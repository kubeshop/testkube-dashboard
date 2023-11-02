import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useSiderCloudMigratePlugin = createUseData<typeof plugin>();
export const useSiderCloudMigrateSlot = createUseSlot<typeof plugin>();
export const useSiderCloudMigrateSlotFirst = createUseSlotFirst<typeof plugin>();
