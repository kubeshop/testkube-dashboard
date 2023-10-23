import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useRouterPlugin = createUseData<typeof plugin>();
export const useRouterSlot = createUseSlot<typeof plugin>();
export const useRouterSlotFirst = createUseSlotFirst<typeof plugin>();
