import env from '../env';

export enum externalLinks {
  documentation = 'https://docs.testkube.io/',
  github = 'https://github.com/kubeshop/testkube',
  slack = 'https://join.slack.com/t/testkubeworkspace/shared_invite/zt-2arhz5vmu-U2r3WZ69iPya5Fw0hMhRDg',
  containerExecutor = 'https://docs.testkube.io/test-types/container-executor',
  dashboardDocumentation = 'https://docs.testkube.io/articles/testkube-dashboard',
  integrations = 'https://testkube.io/integrations',
  sourcesApi = 'https://docs.testkube.io/openapi/#tag/test-sources',
  sourcesDocumentation = 'https://docs.testkube.io/articles/creating-tests/#test-source',
  testSources = 'https://docs.testkube.io/articles/test-sources',
  testkubeCloud = 'https://app.testkube.io',
  OSStoCloudMigration = 'https://app.testkube.io/system-init?cloudMigrate=true',
  apiEndpoint = 'https://docs.testkube.io/articles/testkube-dashboard-api-endpoint',
  createTestSuite = 'https://docs.testkube.io/articles/creating-test-suites',
  createTest = 'https://docs.testkube.io/articles/creating-tests',
  testTypes = 'https://docs.testkube.io/category/test-types',
  testSuitesCreating = 'https://docs.testkube.io/using-testkube/test-suites/testsuites-creating/',
  arguments = 'https://docs.testkube.io/test-types/executor-soapui/#using-parameters-and-arguments-in-your-tests',
  variables = 'https://docs.testkube.io/articles/adding-tests-variables/',
  customExecutor = 'https://docs.testkube.io/test-types/container-executor#creating-a-custom-executor',
  dashboardNotWorking = 'https://docs.testkube.io/articles/common-issues/#why-is-the-testkube-dashboard-not-working-or-does-not-return-results',
  transitionFromOSS = 'https://docs.testkube.io/testkube-pro/articles/transition-from-oss',
  cloudIntro = 'https://docs.testkube.io/testkube-pro/articles/intro',
  testTriggers = 'https://docs.testkube.io/articles/test-triggers',
  addingTimeout = 'https://docs.testkube.io/articles/adding-timeout/',
  contactUs = 'https://calendly.com/bruno-at-kubeshop/15-minute-meeting',
  organizationMembers = 'https://docs.testkube.io/testkube-pro/articles/organization-management#members',
  environmentMembers = 'https://docs.testkube.io/testkube-pro/articles/environment-management#managing-environment-member-roles',
  notificationsAndWebhooks = 'https://docs.testkube.io/articles/webhooks',
  statusPages = 'https://docs.testkube.io/testkube-pro/articles/status-pages',
  integrationOverview = 'https://docs.testkube.io/articles/cicd-overview',
  integrationWithGithubActions = 'https://docs.testkube.io/articles/github-actions',
  integrationWithGitlabCI = 'https://docs.testkube.io/articles/gitlab',
  integrationWithJenkins = 'https://docs.testkube.io/articles/jenkins',
  integrationWithAzure = 'https://docs.testkube.io/articles/azure',
  integrationWithCircleCI = 'https://docs.testkube.io/articles/circleci',
}

const crdCdn = `https://raw.githubusercontent.com/kubeshop/testkube-operator/${encodeURIComponent(
  env.crdOperatorRevision
)}/config/crd/bases`;
export const testkubeCRDBases = {
  executors: `${crdCdn}/executor.testkube.io_executors.yaml`,
  webhooks: `${crdCdn}/executor.testkube.io_webhooks.yaml`,
  scripts: `${crdCdn}/tests.testkube.io_scripts.yaml`,
  tests: `${crdCdn}/tests.testkube.io_tests.yaml`,
  sources: `${crdCdn}/tests.testkube.io_testsources.yaml`,
  testSuites: `${crdCdn}/tests.testkube.io_testsuites.yaml`,
  triggers: `${crdCdn}/tests.testkube.io_testtriggers.yaml`,
};
