import type {Args} from './args';
import type {EntityMap} from './entityMap';

export interface Executor {
  name: string;
  displayName?: string;
  executor: {
    description: string;
    executorType: string;
    image: string;
    types: string[];
    uri: string;
    jobTemplate: string;
    labels: EntityMap;
    features: ExecutorFeature[];
    imagePullSecrets?: ImagePullSecret[];
    command?: string[];
    args?: Args;
    meta: ExecutorMeta;
    contentTypes: string[];
  };
}

export interface ImagePullSecret {
  name: string;
}

export type ExecutorFeature = 'artifacts' | 'junit-report';

export interface ExecutorMeta {
  docsURI: string;
  iconURI: string;
}
