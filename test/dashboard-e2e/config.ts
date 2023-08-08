import dotenv from 'dotenv';

const {randomUUID} = require('node:crypto');

dotenv.config();

const config = {
  ci: process.env.CI ?? '0',
  baseUrl: process.env.BASE_URL,
  basicAuthUser: process.env.BASIC_AUTH_USER,
  basicAuthPassword: process.env.BASIC_AUTH_PASS,

  cloudContext: process.env.CLOUD_CONTEXT,
  bearerToken: process.env.BEARER_TOKEN,

  apiUrl: process.env.API_URL!,
  dashboardApiUrl: process.env.DASHBOARD_API_URL!,

  runId: process.env.RUN_ID || randomUUID(),
};

if (!config.apiUrl) {
  throw new Error('API_URL env variable is required.');
}

if (!config.dashboardApiUrl) {
  throw new Error('DASHBOARD_API_URL env variable is required.');
}

export default config;
