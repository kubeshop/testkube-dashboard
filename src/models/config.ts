interface ConfigState {
  apiEndpoint: string | null;
  redirectTarget: {
    runTarget: boolean;
    targetTestId: string | null;
    targetTestExecutionId: string | null;
  };
  fullScreenLogOutput: {
    isFullScreenLogOutput: boolean;
    logOutput: string;
  };
}

export type {ConfigState};
