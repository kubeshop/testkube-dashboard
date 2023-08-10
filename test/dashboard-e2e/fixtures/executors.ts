import config from '../config';

export default {
  'container-executor-curl-1': {
    name: 'temp-executor-curl',
    image: 'curlimages/curl:7.85.0',
    namespace: config.namespace,
    types: ['temp-executor-curl-1/id'],
    executorType: 'container',
  },
};
