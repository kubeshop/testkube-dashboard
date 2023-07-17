/**
 * Fixtures should be TS files, as JSONs are not working in composite projects.
 * @see {@link https://github.com/TypeStrong/ts-loader/issues/905}
 */
export default {
  'container-executor-curl-1': {
    name: 'temp-executor-curl',
    image: 'curlimages/curl:7.85.0',
    namespace: 'testkube',
    types: ['temp-executor-curl-1/id'],
    executorType: 'container',
  },
};
