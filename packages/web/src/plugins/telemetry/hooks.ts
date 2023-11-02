import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';

import type plugin from './plugin';

export const useTelemetryPlugin = createUseData<typeof plugin>();
export const useTelemetrySlot = createUseSlot<typeof plugin>();
export const useTelemetrySlotFirst = createUseSlotFirst<typeof plugin>();
