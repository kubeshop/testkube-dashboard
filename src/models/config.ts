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
  };
}

export type ClusterConfig = {
  id: string;
  clusterId: string;
  enableTelemetry: boolean;
};

export type {ConfigState};
