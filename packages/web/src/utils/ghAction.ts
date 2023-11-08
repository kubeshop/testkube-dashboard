import YAML from 'yaml';

export const createGhActionOSSYaml = ({namespace, testName}: {namespace: string; testName: string}): string => {
  return YAML.stringify({
    name: 'Running Testkube Tests.',
    on: {
      push: {
        branches: ['main'],
      },
    },

    jobs: {
      steps: [
        {
          name: 'Checkout',
          uses: 'actions/checkout@v4',
        },

        {
          uses: 'kubeshop/setup-testkube@v1',
          with: {
            namespace,
          },
        },
        {
          run: `testkube run test ${testName} -f\n`,
        },
      ],
    },
  });
};
