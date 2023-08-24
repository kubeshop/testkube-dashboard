import config from '../config';

export default {
  'cypress-git': {
    name: 'temp-e2e-cypress-git',
    namespace: config.namespace,
    type: 'cypress/project',
    content: {
      type: 'git',
      repository: {
        type: 'git',
        uri: 'https://github.com/kubeshop/testkube',
        branch: 'main',
        path: 'test/cypress/executor-tests/cypress-without-envs',
      },
    },
    labels: {
      'core-tests': 'dashboard-e2e-internal-temp',
    },
  },
  'cypress-git-created': {
    name: 'temp-e2e-cypress-git-created',
    namespace: config.namespace,
    type: 'cypress/project',
    content: {
      type: 'git',
      repository: {
        type: 'git',
        uri: 'https://github.com/kubeshop/testkube',
        branch: 'main',
        path: 'test/cypress/executor-tests/cypress-without-envs',
      },
    },
    labels: {
      'core-tests': 'dashboard-e2e-internal-temp',
    },
  },
  'k6-git': {
    name: 'temp-e2e-k6-git',
    namespace: config.namespace,
    type: 'k6/script',
    content: {
      type: 'git',
      repository: {
        type: 'git',
        uri: 'https://github.com/kubeshop/testkube',
        branch: 'main',
        path: 'test/k6/executor-tests/k6-smoke-test-without-envs.js',
      },
    },
    labels: {
      'core-tests': 'dashboard-e2e-internal-temp',
    },
  },
  'k6-git-created': {
    name: 'temp-e2e-k6-git-created',
    namespace: config.namespace,
    type: 'k6/script',
    content: {
      type: 'git',
      repository: {
        type: 'git',
        uri: 'https://github.com/kubeshop/testkube',
        branch: 'main',
        path: 'test/k6/executor-tests/k6-smoke-test-without-envs.js',
      },
    },
    labels: {
      'core-tests': 'dashboard-e2e-internal-temp',
    },
  },
  'postman-git': {
    name: 'temp-e2e-postman-git',
    namespace: config.namespace,
    type: 'postman/collection',
    content: {
      type: 'git',
      repository: {
        type: 'git',
        uri: 'https://github.com/kubeshop/testkube',
        branch: 'main',
        path: 'test/postman/executor-tests/postman-executor-smoke-without-envs.postman_collection.json',
      },
    },
    labels: {
      'core-tests': 'dashboard-e2e-internal-temp',
    },
  },
  'postman-git-created': {
    name: 'temp-e2e-postman-git-created',
    namespace: config.namespace,
    type: 'postman/collection',
    content: {
      type: 'git',
      repository: {
        type: 'git',
        uri: 'https://github.com/kubeshop/testkube',
        branch: 'main',
        path: 'test/postman/executor-tests/postman-executor-smoke-without-envs.postman_collection.json',
      },
    },
    labels: {
      'core-tests': 'dashboard-e2e-internal-temp',
    },
  },
  'postman-negative-test': {
    name: 'temp-e2e-postman-git-ran-neg-test',
    namespace: config.namespace,
    type: 'postman/collection',
    content: {
      type: 'git',
      repository: {
        type: 'git',
        uri: 'https://github.com/kubeshop/testkube',
        branch: 'main',
        path: 'test/postman/executor-tests/postman-executor-smoke.postman_collection.json',
      },
    },
    labels: {
      'core-tests': 'cli-internal-temp',
    },
  },
  'postman-negative-init': {
    name: 'temp-e2e-postman-git-ran-neg-init',
    namespace: config.namespace,
    type: 'postman/collection',
    content: {
      type: 'git',
      repository: {
        type: 'git',
        uri: 'https://github.com/kubeshop/testkube',
        branch: 'some-non-existing-branch',
        path: 'some/incorrect/path/non-existing-file.json',
      },
    },
    labels: {
      'core-tests': 'cli-internal-temp',
    },
  },
  'k6-string': {
    name: 'temp-k6-string',
    type: 'k6/script',
    labels: {
      'core-tests': 'dashboard-e2e-internal-temp',
    },
    content: {
      type: 'string',
      data: `import http from 'k6/http';

export default function () {
  http.get('https://testkube.io/');
}`,
    },
  },
  'k6-file': {
    name: 'temp-k6-string',
    type: 'k6/script',
    labels: {
      'core-tests': 'dashboard-e2e-internal-temp',
    },
    content: {
      type: 'file',
      fixture_file_path: 'k6-smoke-test-without-envs.js',
    },
  },
};
