import superagent from 'superagent';

import type {
  ExecutorData,
  TestData,
  TestExecutionListResponse,
  TestSourceData,
  TestSuiteData,
  TriggerData,
  WebhookData,
} from '../types';

export class ApiHelpers {
  public apiUrl: string;
  public cloudContext?: string;
  public bearerToken?: string;

  public constructor(apiUrl: string, cloudContext?: string, bearerToken?: string) {
    this.apiUrl = apiUrl;
    this.cloudContext = cloudContext;
    this.bearerToken = bearerToken;
  }

  public async makeGet<T>(requestUrl: string): Promise<T> {
    try {
      const response = await superagent
        .get(requestUrl)
        .set('Content-Type', 'application/json')
        .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '');
      return ApiHelpers.parseResponse(response);
    } catch (e) {
      throw Error(`makeGet failed on "${requestUrl}" with: "${e}"`);
    }
  }

  public async makePost<T, U extends string | object | undefined = any>(
    requestUrl: string,
    requestData?: U
  ): Promise<T> {
    try {
      const response = await superagent
        .post(requestUrl)
        .set('Content-Type', 'application/json')
        .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '')
        .send(requestData);
      return ApiHelpers.parseResponse(response);
    } catch (e) {
      throw Error(`makePost failed on "${requestUrl}" with: "${e}"`);
    }
  }

  public async makePatch<T, U extends string | object | undefined = any>(
    requestUrl: string,
    requestData?: U
  ): Promise<T> {
    try {
      const response = await superagent
        .patch(requestUrl)
        .set('Content-Type', 'application/json')
        .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '')
        .send(requestData);
      return ApiHelpers.parseResponse(response);
    } catch (e) {
      throw Error(`makePatch failed on "${requestUrl}" with: "${e}"`);
    }
  }

  public async makeDelete<T>(requestUrl: string): Promise<T> {
    try {
      return superagent
        .delete(requestUrl)
        .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '')
        .send() as unknown as Promise<T>;
    } catch (e) {
      throw Error(`makeDelete failed on "${requestUrl}" with: "${e}"`);
    }
  }

  public async getTests(): Promise<TestData[]> {
    return this.makeGet(`${this.apiUrl}/tests`);
  }

  public async getTestSuites(): Promise<TestSuiteData[]> {
    return this.makeGet(`${this.apiUrl}/test-suites`);
  }

  public async getTestSources(): Promise<TestSourceData[]> {
    return this.makeGet(`${this.apiUrl}/test-sources`);
  }

  public async getExecutors(): Promise<ExecutorData[]> {
    return this.makeGet(`${this.apiUrl}/executors`);
  }

  public async getTriggers(): Promise<TriggerData[]> {
    return this.makeGet(`${this.apiUrl}/triggers`);
  }

  public async getWebhooks(): Promise<WebhookData[]> {
    return this.makeGet(`${this.apiUrl}/webhooks`);
  }

  public async createTest(testData: Partial<TestData>): Promise<TestData> {
    return this.makePost(`${this.apiUrl}/tests`, testData);
  }

  public async createTestSource(testSourceData: Partial<TestSourceData>): Promise<TestSourceData> {
    return this.makePost(`${this.apiUrl}/test-sources`, testSourceData);
  }

  public async abortTest(testName: string, executionId: string): Promise<any> {
    return this.makePatch(`${this.apiUrl}/tests/${testName}/executions/${executionId}`);
  }

  public async removeTest(testName: string): Promise<any> {
    return this.makeDelete(`${this.apiUrl}/tests/${testName}`);
  }

  public async removeTestSuite(testSuiteName: string): Promise<any> {
    return this.makeDelete(`${this.apiUrl}/test-suites/${testSuiteName}`);
  }

  public async removeTestSource(testSourceName: string): Promise<any> {
    return this.makeDelete(`${this.apiUrl}/test-sources/${testSourceName}`);
  }

  public async removeExecutor(executorName: string): Promise<any> {
    return this.makeDelete(`${this.apiUrl}/executors/${executorName}`);
  }

  public async removeTrigger(triggerName: string): Promise<any> {
    return this.makeDelete(`${this.apiUrl}/triggers/${triggerName}`);
  }

  public async removeWebhook(webhookName: string): Promise<any> {
    return this.makeDelete(`${this.apiUrl}/webhooks/${webhookName}`);
  }

  public async updateTest(testData: Partial<TestData>): Promise<any> {
    return this.makePatch(`${this.apiUrl}/tests/${testData.name}`, testData);
  }

  public async updateTestSource(testSourceData: Partial<TestSourceData>): Promise<any> {
    return this.makePatch(`${this.apiUrl}/test-sources/${testSourceData.name}`, testSourceData);
  }

  public async isTestCreated(testName: string): Promise<boolean> {
    try {
      const currentTests = await this.getTests();
      return currentTests.find(test => test.name === testName) !== undefined;
    } catch (e) {
      throw Error(`isTestCreated failed for "${testName}" with: "${e}"`);
    }
  }

  public async isTestSuiteCreated(testSuiteName: string): Promise<boolean> {
    try {
      const currentTestSuites = await this.getTestSuites();
      return currentTestSuites.find(testSuite => testSuite.name === testSuiteName) !== undefined;
    } catch (e) {
      throw Error(`isTestSuiteCreated failed for "${testSuiteName}" with: "${e}"`);
    }
  }

  public async isTestSourceCreated(testSourceName: string): Promise<boolean> {
    try {
      const currentTestSources = await this.getTestSources();
      return currentTestSources.some(({name}) => name === testSourceName);
    } catch (e) {
      throw Error(`isTestSourceCreated failed for "${testSourceName}" with: "${e}"`);
    }
  }

  public async isExecutorCreated(executorName: string): Promise<boolean> {
    try {
      const currentExecutors = await this.getExecutors();
      return currentExecutors.some(({name}) => name === executorName);
    } catch (e) {
      throw Error(`isExecutorCreated failed for "${executorName}" with: "${e}"`);
    }
  }

  public async isTriggerCreated(triggerName: string): Promise<boolean> {
    try {
      const currentTriggers = await this.getTriggers();
      return currentTriggers.some(({name}) => name === triggerName);
    } catch (e) {
      throw Error(`isTriggerCreated failed for "${triggerName}" with: "${e}"`);
    }
  }

  public async isWebhookCreated(webhookName: string): Promise<boolean> {
    try {
      const currentWebhooks = await this.getWebhooks();
      return currentWebhooks.some(({name}) => name === webhookName);
    } catch (e) {
      throw Error(`isWebhookCreated failed for "${webhookName}" with: "${e}"`);
    }
  }

  public async assureTestNotCreated(testName: string): Promise<void> {
    try {
      if (await this.isTestCreated(testName)) {
        await this.removeTest(testName);
      }
    } catch (e) {
      throw Error(`assureTestNotCreated failed for "${testName}" with: "${e}"`);
    }
  }

  public async assureTestSuiteNotCreated(testSuiteName: string): Promise<void> {
    try {
      if (await this.isTestSuiteCreated(testSuiteName)) {
        await this.removeTestSuite(testSuiteName);
      }
    } catch (e) {
      throw Error(`assureTestSuiteNotCreated failed for "${testSuiteName}" with: "${e}"`);
    }
  }

  public async assureTestSourceNotCreated(testSourceName: string): Promise<void> {
    try {
      const alreadyCreated = await this.isTestSourceCreated(testSourceName);
      if (alreadyCreated) {
        await this.removeTestSource(testSourceName);
      }
    } catch (e) {
      throw Error(`assureTestSourceNotCreated failed for "${testSourceName}" with: "${e}"`);
    }
  }

  public async assureExecutorNotCreated(executorName: string): Promise<void> {
    try {
      if (await this.isExecutorCreated(executorName)) {
        await this.removeExecutor(executorName);
      }
    } catch (e) {
      throw Error(`assureExecutorNotCreated failed for "${executorName}" with: "${e}"`);
    }
  }

  public async assureTriggerNotCreated(triggerName: string): Promise<void> {
    try {
      if (await this.isTriggerCreated(triggerName)) {
        await this.removeTrigger(triggerName);
      }
    } catch (e) {
      throw Error(`assureTriggerNotCreated failed for "${triggerName}" with: "${e}"`);
    }
  }

  public async assureWebhookNotCreated(webhookName: string): Promise<void> {
    try {
      if (await this.isWebhookCreated(webhookName)) {
        await this.removeWebhook(webhookName);
      }
    } catch (e) {
      throw Error(`assureWebhookNotCreated failed for "${webhookName}" with: "${e}"`);
    }
  }

  public async assureTestCreated(testData: Partial<TestData>, fullCleanup = false): Promise<void> {
    try {
      if (await this.isTestCreated(testData.name)) {
        if (fullCleanup) {
          await this.removeTest(testData.name);
          await this.createTest(testData);
        } else {
          await this.updateTest(testData);
        }
      } else {
        await this.createTest(testData);
      }
    } catch (e) {
      throw Error(`assureTestCreated failed for "${testData.name}" with: "${e}"`);
    }
  }

  public async assureTestSourceCreated(testSourceData: Partial<TestSuiteData>): Promise<void> {
    try {
      const alreadyCreated = await this.isTestSourceCreated(testSourceData.name);

      if (alreadyCreated) {
        await this.updateTestSource(testSourceData);
      } else {
        await this.createTestSource(testSourceData);
      }
    } catch (e) {
      throw Error(`assureTestSourceCreated failed for "${testSourceData.name}" with: "${e}"`);
    }
  }

  public async getTestData(testName: string): Promise<TestData> {
    return this.makeGet(`${this.apiUrl}/tests/${testName}`);
  }

  public async getTestSuiteData(testSuiteName: string): Promise<TestSuiteData> {
    return this.makeGet(`${this.apiUrl}/test-suites/${testSuiteName}`);
  }

  public async getTestSourceData(testSourceName: string): Promise<TestSourceData> {
    return this.makeGet(`${this.apiUrl}/test-sources/${testSourceName}`);
  }

  public async getExecutorData(executorName: string): Promise<ExecutorData> {
    return this.makeGet(`${this.apiUrl}/executors/${executorName}`);
  }

  public async getTriggerData(triggerName: string): Promise<TestData> {
    return this.makeGet(`${this.apiUrl}/triggers/${triggerName}`);
  }

  public async getWebhookData(webhookName: string): Promise<TestData> {
    return this.makeGet(`${this.apiUrl}/webhooks/${webhookName}`);
  }

  public async getTestExecutions(testName: string): Promise<TestExecutionListResponse> {
    return this.makeGet(`${this.apiUrl}/tests/${testName}/executions`);
  }

  public async getLastExecutionNumber(testName: string): Promise<number> {
    try {
      const response = await this.getTestExecutions(testName);
      return response.totals.results === 0 ? 0 : response.results[0].number;
    } catch (e) {
      throw Error(`getLastExecutionNumber failed with: "${e}"`);
    }
  }

  public static parseResponse(response: any): any {
    // Cloud is missing the `content-type`, so there is no JSON response in `response.body`
    return JSON.parse(response.text);
  }
}
