import {defineConfig, devices} from '@playwright/test';

import config from './config';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: Boolean(config.ci),
  /* Retry on CI only */
  retries: config.ci ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: config.ci ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: config.baseUrl,
    httpCredentials: {
      username: config.basicAuthUser ? config.basicAuthUser : '',
      password: config.basicAuthPassword ? config.basicAuthPassword : '',
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
  ],
});
