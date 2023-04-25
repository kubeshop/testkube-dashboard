import {Entity} from './entity';

type SettingsTabConfigType = {entity: Entity; tab: number | string};

interface ConfigState {
  namespace: string;
  redirectTarget: {
    runTarget: boolean;
    targetTestId: string | null;
    targetTestExecutionId: string | null;
    settingsTabConfig: SettingsTabConfigType | null;
  };
  fullScreenLogOutput: {
    isFullScreenLogOutput: boolean;
    logOutput: string;
    logOutputDOMRect?: Coordinates;
  };
}

type Coordinates = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type ClusterConfig = {
  id: string;
  clusterId: string;
  enableTelemetry: boolean;
};

export type {ConfigState, Coordinates, ClusterConfig, SettingsTabConfigType};
