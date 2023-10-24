import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useAiInsightsPromoPlugin = createUseData<typeof plugin>();
export const useAiInsightsPromoSlot = createUseSlot<typeof plugin>();
export const useAiInsightsPromoSlotFirst = createUseSlotFirst<typeof plugin>();
