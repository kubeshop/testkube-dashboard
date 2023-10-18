import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type LegacyPlugin from './legacy';

export const useLegacyData = createUseData<typeof LegacyPlugin>();
export const useLegacySlot = createUseSlot<typeof LegacyPlugin>();
export const useLegacySlotFirst = createUseSlotFirst<typeof LegacyPlugin>();
