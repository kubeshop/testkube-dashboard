import {Args} from '@models/args';
import {EntityMap} from '@models/entityMap';

type Executor = {
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
};

export type ImagePullSecret = {name: string};

type ExecutorFeature = 'artifacts' | 'junit-report';

export type ExecutorMeta = {
  docsURI: string;
  iconURI: string;
};

interface ExecutorsState {
  executorsList: Executor[];
  executorsFeaturesMap: EntityMap<ExecutorFeature[]>;
  currentExecutor?: string;
}

export type {ExecutorsState, Executor, ExecutorFeature};
