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

export type TestTriggersBulkUpdate = TestTriggerSelector[];

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
