export type TriggersKeymap = {
  resources: string[];
  events: {[key: string]: string[]};
  actions: string[];
  executions: string[];
};
