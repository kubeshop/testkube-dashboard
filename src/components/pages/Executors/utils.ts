import {TestExecutor} from '@models/testExecutors';

type ExecutorGridItem = {
  type: TestExecutor | 'custom';
  title: string;
  description: string;
  docLink: string;
};

export const executorsList: ExecutorGridItem[] = [
  {
    type: 'cypress/project',
    title: 'Cypress',
    description:
      'Fast, easy and reliable testing for anything that runs in a browser. The de-facto standard for frontend tests',
    docLink: 'https://kubeshop.github.io/testkube/executor-cypress/',
  },
  {
    type: 'postman/collection',
    title: 'Postman',
    description: 'Run tests from Postman definitions. Easy to define and collaborate across your team.',
    docLink: 'https://kubeshop.github.io/testkube/executor-postman/',
  },
  {
    type: 'custom',
    title: 'Build your own',
    description:
      'Our executors are modular and can easily be extended. We help you to get started with some templates and guides.',
    docLink: 'https://kubeshop.github.io/testkube/executor-custom/',
  },
  {
    type: 'k6/script',
    title: 'K6',
    description:
      'k6 is an open-source tool and cloud service that makes load testing easy for developers and QA engineers',
    docLink: 'https://kubeshop.github.io/testkube/executor-k6/',
  },
  {
    type: 'curl/test',
    title: 'curl',
    description: 'Test your API by running Curl commands directly from your testkube and evaluate server responses.',
    docLink: '',
  },
  {
    type: 'soapui/xml',
    title: 'SoapUI',
    description: "SoapUI is the world's most widely-used automated testing tool for SOAP and REST APIs.",
    docLink: 'https://kubeshop.github.io/testkube/executor-soapui/',
  },
  {
    type: 'artillery/test',
    title: 'Artillery',
    description:
      'Artillery is a modern load testing & smoke testing for SRE and DevOps. Runs on multiple geographical regions.',
    docLink: 'https://kubeshop.github.io/testkube/executor-artillery/',
  },
  {
    type: 'kubepug/yaml',
    title: 'KubePug',
    description: 'Kubernetes Pre UpGrade (Checker) checks whether your objects are deprecated before migrating. ',
    docLink: 'https://kubeshop.github.io/testkube/executor-kubepug/',
  },
  {
    type: 'maven/test',
    title: 'Maven',
    description: '',
    docLink: 'https://kubeshop.github.io/testkube/executor-maven/',
  },
  {
    type: 'gradle/test',
    title: 'Gradle',
    description: '',
    docLink: 'https://kubeshop.github.io/testkube/executor-gradle/',
  },
  {
    type: 'ginkgo/test',
    title: 'Ginkgo',
    description: '',
    docLink: 'https://kubeshop.github.io/testkube/executor-ginkgo/',
  },
];
