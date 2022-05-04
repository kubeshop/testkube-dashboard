interface ConfigState {
  apiEndpoint: string | null;
  redirectTarget: {
    targetTestId: string | null;
    targetTestExecutionId: string | null;
  };
  fullScreenLogOutput: {
    isFullScreenLogOutput: boolean;
    logOutput: string;
  };
}

export type {ConfigState};
