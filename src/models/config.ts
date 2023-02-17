interface ConfigState {
  apiEndpoint: string | null;
  namespace: string;
  redirectTarget: {
    runTarget: boolean;
    targetTestId: string | null;
    targetTestExecutionId: string | null;
    isSettingsTabConfig: boolean;
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

export type {ConfigState, Coordinates, ClusterConfig};
