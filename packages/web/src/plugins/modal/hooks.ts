import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useModalPlugin = createUseData<typeof plugin>();
export const useModalSlot = createUseSlot<typeof plugin>();
export const useModalSlotFirst = createUseSlotFirst<typeof plugin>();
