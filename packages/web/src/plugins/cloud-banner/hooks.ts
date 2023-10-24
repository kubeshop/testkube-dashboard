import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useCloudBannerPlugin = createUseData<typeof plugin>();
export const useCloudBannerSlot = createUseSlot<typeof plugin>();
export const useCloudBannerSlotFirst = createUseSlotFirst<typeof plugin>();
