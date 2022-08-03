import {EntityMap} from './entityMap';

type Executor = {
  name: string;
  executor: {
    description: string;
    executorType: string;
    image: string;
    types: string[];
    uri: string;
    jobTemplate: string;
    labels: EntityMap;
    features: 'artifacts' | 'junit-report';
  };
};

interface ExecutorsState {
  executorsList: Executor[];
  executorsFeaturesMap: EntityMap;
}

export type {ExecutorsState, Executor};
