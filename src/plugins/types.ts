import {Execution} from '@models/execution';

import PluginScope from './PluginScope';

export interface Plugin {
  name: string;
  setup: (scope: PluginScope) => void;
  order?: number;
}

export interface SlotMetaData {
  order?: number;
  visible?: () => boolean;
}

export interface TestExecutionTabsInterface {
  execution: Execution;
  test: any;
}

export interface AiBannerInterface {
  onClose: () => void;
  onAccept: () => void;
}
