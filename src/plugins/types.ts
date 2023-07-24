import {Execution} from '@models/execution';

import PluginScope from './PluginScope';

export interface Plugin {
  name: string;
  setup: (scope: PluginScope) => void;
  order?: number;
}

export interface SlotMetaData {
  order?: number;
}

export interface TestExecutionTabsInterface {
  execution: Execution;
  test: any;
}
