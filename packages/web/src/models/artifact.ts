export type Artifact = {
  description: string;
  name: string;
  size: number;
  status: 'ready' | 'failed' | 'processing';
};
