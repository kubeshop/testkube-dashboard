/**
 * Fixtures should be TS files, as JSONs are not working in composite projects.
 * @see {@link https://github.com/TypeStrong/ts-loader/issues/905}
 */
export default {
  'testsource-k6-testkube-1': {
    name: 'temp-tsrc-k6-testkube-1',
    repository: {
      type: 'git',
      uri: 'https://github.com/kubeshop/testkube.git',
    },
    namespace: 'testkube',
  },
  'testsource-k6-testkube-created-1': {
    name: 'temp-tsrc-k6-testkube-cr-1',
    repository: {
      type: 'git',
      uri: 'https://github.com/kubeshop/testkube.git',
    },
    namespace: 'testkube',
  },
};
