import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useSiderDocsPlugin = createUseData<typeof plugin>();
export const useSiderDocsSlot = createUseSlot<typeof plugin>();
export const useSiderDocsSlotFirst = createUseSlotFirst<typeof plugin>();
