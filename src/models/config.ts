interface ConfigState {
  apiEndpoint: string | null;
  redirectTarget: {
    targetTestId: string | null;
    targetTestExecutionId: string | null;
  };
}

export type {ConfigState};
