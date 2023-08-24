import type {Execution} from '@models/execution';

import type {PluginScope} from './PluginScope';

export interface Plugin {
  name: string;
  setup: (scope: PluginScope) => void;
  order?: number;
}

export interface SlotMetadata {
  order?: number;
  visible?: () => boolean;
}

export interface TestExecutionTabsInterface {
  execution: Execution;
  test: any;
}

export interface LogOutputBannerInterface {
  setExecutionTab: (tab: string) => void;
}
