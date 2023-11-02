import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useWebhooksPlugin = createUseData<typeof plugin>();
export const useWebhooksSlot = createUseSlot<typeof plugin>();
export const useWebhooksSlotFirst = createUseSlotFirst<typeof plugin>();
