type ExecutionStep = {
  stopTestOnFailure: boolean;
  execute?: {namespace?: string; name?: string};
  delay?: {duration?: number};
};

export default ExecutionStep;
