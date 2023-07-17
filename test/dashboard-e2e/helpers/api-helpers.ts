import superagent from 'superagent';

import type {ExecutorData, TestData, TestExecutionListResponse, TestSuiteData} from '../types';

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

  public async getExecutors(): Promise<ExecutorData[]> {
    return this.makeGet(`${this.apiUrl}/executors`);
  }

  public async createTest(testData: Partial<TestData>): Promise<TestData> {
    return this.makePost(`${this.apiUrl}/tests`, testData);
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

  public async removeExecutor(executorName: string): Promise<any> {
    return this.makeDelete(`${this.apiUrl}/executors/${executorName}`);
  }

  public async updateTest(testData: Partial<TestData>): Promise<any> {
    return this.makePatch(`${this.apiUrl}/tests/${testData.name}`, testData);
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

  public async isExecutorCreated(executorName: string): Promise<boolean> {
    try {
      const currentExecutors = await this.getExecutors();
      return currentExecutors.some(({name}) => name === executorName);
    } catch (e) {
      throw Error(`isExecutorCreated failed for "${executorName}" with: "${e}"`);
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

  public async assureExecutorNotCreated(executorName: string): Promise<void> {
    try {
      if (await this.isExecutorCreated(executorName)) {
        await this.removeExecutor(executorName);
      }
    } catch (e) {
      throw Error(`assureExecutorNotCreated failed for "${executorName}" with: "${e}"`);
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

  public async getTestData(testName: string): Promise<TestData> {
    return this.makeGet(`${this.apiUrl}/tests/${testName}`);
  }

  public async getTestSuiteData(testSuiteName: string): Promise<TestSuiteData> {
    return this.makeGet(`${this.apiUrl}/test-suites/${testSuiteName}`);
  }

  public async getExecutorData(executorName: string): Promise<ExecutorData> {
    return this.makeGet(`${this.apiUrl}/executors/${executorName}`);
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
