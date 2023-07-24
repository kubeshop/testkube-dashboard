import PluginScope from './PluginScope';

export interface Plugin {
  name: string;
  setup: (scope: PluginScope) => void;
  order?: number;
}

export interface PluginMetaData {
  order?: number;
}
