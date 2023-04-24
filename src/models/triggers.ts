import {EntityMap} from './entityMap';

export enum TriggerResources {
  'pod' = 'pod',
  'deployment' = 'deployment',
  'statefulset' = 'statefulset',
  'daemonset' = 'daemonset',
  'service' = 'service',
  'ingress' = 'ingress',
  'event' = 'event',
}

export type TriggerEvent = EntityMap<string[]>;

export enum TriggerAction {
  run = 'run',
}

export type TriggerExecution = 'test' | 'testsuite';

export type LabelSelector = {matchExpressions: MatchExpression[]; matchLabels: MatchLabels};

export type MatchExpression = {key: string; operator: string; values: string[]};
export type MatchLabels = EntityMap;

export type TestTrigger = {
  name: string;
  namespace?: string;
  labels?: EntityMap;
  resource: TriggerResources;
  resourceSelector: TestTriggerSelector;
  event: string;
  action: TriggerAction[];
  execution: TriggerExecution;
  testSelector: TestTriggerSelector;
};

type TestTriggerTypes = 'name' | 'labels';

export type TestTriggerFormEntity = {
  type?: [TestTriggerTypes, TestTriggerTypes];
  resourceSelector: `${string}/${string}` | MatchLabels;
  testSelector: string | MatchLabels;
  action: `${TriggerAction} ${TriggerExecution}`;
  name: string;
  namespace?: string;
  labels?: EntityMap;
  resource: TriggerResources;
  event: string;
  execution: TriggerExecution;
};

export type TriggerType = 'label-label' | 'name-label' | 'name-name' | 'label-name';

export type TestTriggerSelector = {
  name: string;
  namespace?: string;
  labelSelector: LabelSelector;
};

export type TriggersKeyMap = {
  resources: TriggerResources[];
  events: TriggerEvent;
  actions: TriggerAction[];
  executions: TriggerExecution[];
};

export type AddTriggerOption = {key: TriggerType; label: string; description: string};
