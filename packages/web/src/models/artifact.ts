export type Artifact = {
  executionName: string;
  name: string;
  size: number;
  status?: 'ready' | 'failed' | 'processing';
};
