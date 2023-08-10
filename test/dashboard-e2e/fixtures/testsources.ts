import config from '../config';

export default {
  'testsource-k6-testkube-1': {
    name: 'temp-tsrc-k6-testkube-1',
    repository: {
      type: 'git',
      uri: 'https://github.com/kubeshop/testkube.git',
    },
    namespace: config.namespace,
  },
  'testsource-k6-testkube-created-1': {
    name: 'temp-tsrc-k6-testkube-cr-1',
    repository: {
      type: 'git',
      uri: 'https://github.com/kubeshop/testkube.git',
    },
    namespace: config.namespace,
  },
};
