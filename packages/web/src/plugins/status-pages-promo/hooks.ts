import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useStatusPagesPromoPlugin = createUseData<typeof plugin>();
export const useStatusPagesPromoSlot = createUseSlot<typeof plugin>();
export const useStatusPagesPromoSlotFirst = createUseSlotFirst<typeof plugin>();
