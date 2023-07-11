/**
 * Fixtures should be TS files, as JSONs are not working in composite projects.
 * @see {@link https://github.com/TypeStrong/ts-loader/issues/905}
 */
export default {
  'testsuite-empty': {
    name: 'temp-ts-1',
    description: 'testsuite-description-1',
    labels: {
      testsuite: 'label1',
    },
  },
};
