import {GetPluginState} from '@testkube/plugins/src/internal/Plugin';
import {PluginScope} from '@testkube/plugins/src/internal/PluginScope';
import {PluginScopeStateFor} from '@testkube/plugins/src/internal/types';

import type plugin from './plugin';

export const positions = {
  top: 'contentTop',
  aboveLogOutput: 'logOutputTop',
} as const;

export const conditions = {
  always: () => true,
  failedExecution: tk => tk.data.bannersIsTestFailed(),
} satisfies Record<string, (scope: PluginScope<PluginScopeStateFor<GetPluginState<typeof plugin>>>) => boolean>;

export type PromoBannerPosition = keyof typeof positions;
export type PromoBannerCondition = keyof typeof conditions;

export enum PromoBannerType {
  error = 'error',
  warning = 'warning',
  primary = 'default',
}

export interface PromoBanner {
  id: string;
  permanent?: boolean;
  critical?: boolean;
  recurring?: boolean;
  priority: number;
  position: PromoBannerPosition;
  condition: PromoBannerCondition;
  type: PromoBannerType;
  title: string;
  description: string;
  primaryLink?: {
    label: string;
    url: string;
    target: string;
  } | null;
  secondaryLink?: {
    label: string;
    url: string;
    target: string;
  } | null;
}
