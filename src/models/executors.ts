import {SourceType} from '@models';

import {Args} from './args';
import {EntityMap} from './entityMap';

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
    contentTypes: SourceType[];
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
  currentExecutor?: Executor;
}

export type {ExecutorsState, Executor, ExecutorFeature};
