import {expect} from '@playwright/test';

import {TestDataHandler} from '../helpers/test-data-handler';
import type {ExecutorData, TestData, TestSourceData, TestSuiteData, WebhookData} from '../types';

export function validateLabels(labels: Record<string, string>, createdLabels: Record<string, string>): void {
  Object.entries(labels).forEach(([name, value]) => {
    expect(createdLabels[name]).toEqual(value);
  });
}

export function validateTest(testData: Partial<TestData>, createdTestData: TestData): void {
  expect(testData.name).toEqual(createdTestData.name);
  validateLabels(testData.labels, createdTestData.labels);
  expect(testData.type).toEqual(createdTestData.type);

  // testSources
  if (testData.content.type === 'git') {
    expect(testData.content.type).toEqual(createdTestData.content.type);
    expect(testData.content.repository).toEqual(createdTestData.content.repository);
  } else if (testData.content.type === 'string') {
    expect(testData.content.type).toEqual(createdTestData.content.type);
    expect(createdTestData.content).toMatchObject(testData.content);
  } else if (testData.content.type === 'file') {
    expect(createdTestData.content.type).toEqual('string');
    expect(createdTestData.content.data).toEqual(
      TestDataHandler.getFixtureFileContents(testData.content.fixture_file_path)
    );
  }
}

export function validateTestSuite(testSuiteData: Partial<TestSuiteData>, createdTestSuiteData: TestSuiteData): void {
  expect(testSuiteData.name).toEqual(createdTestSuiteData.name);
  expect(testSuiteData.description).toEqual(createdTestSuiteData.description);
  validateLabels(testSuiteData.labels, createdTestSuiteData.labels);
}

export function validateTestSource(
  testSourceData: Partial<TestSourceData>,
  createdTestSourceData: TestSuiteData
): void {
  expect(testSourceData.name).toEqual(createdTestSourceData.name);

  expect(createdTestSourceData.repository).toMatchObject(testSourceData.repository);
}

export function validateExecutor(executorData: Partial<ExecutorData>, createdExecutorData: ExecutorData): void {
  expect(executorData.name).toEqual(createdExecutorData.name);
  expect(executorData.image).toEqual(createdExecutorData.executor.image);
  expect(executorData.types).toEqual(createdExecutorData.executor.types);
  expect(executorData.executorType).toEqual(createdExecutorData.executor.executorType);
}

export function validateWebhook(webhookData: Partial<WebhookData>, createdWebhookData: WebhookData): void {
  const processedWebhookData = TestDataHandler.getProcessedWebhookData(webhookData);

  expect(processedWebhookData).toEqual(createdWebhookData);
}
