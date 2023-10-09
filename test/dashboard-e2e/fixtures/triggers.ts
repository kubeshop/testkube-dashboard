import config from '../config';

export default {
  'trigger-deployment-creation-name-test-name': {
    name: 'temp-trigger-depl-cr-name-test-name',
    namespace: config.namespace,
    resource: 'deployment',
    event: 'created',
    action: 'run',
    execution: 'test',
    testSelector: {
      name: 'artillery-executor-smoke',
      namespace: 'testkube',
    },
    resourceSelector: {
      name: 'non-existant-resource',
      namespace: 'namespace-name',
    },
  },
};