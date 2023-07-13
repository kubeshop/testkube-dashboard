import {expect} from '@playwright/test';

import type {ExecutorData, TestData, TestSourceData, TestSuiteData} from '../types';

export function validateLabels(labels: Record<string, string>, createdLabels: Record<string, string>): void {
  Object.entries(labels).forEach(([name, value]) => {
    expect(createdLabels[name]).toEqual(value);
  });
}

export function validateTest(testData: Partial<TestData>, createdTestData: TestData): void {
  expect(testData.name).toEqual(createdTestData.name);
  validateLabels(testData.labels, createdTestData.labels);
  expect(testData.type).toEqual(createdTestData.type);
  expect(testData.content.type).toEqual(createdTestData.content.type);

  // testSources
  if (testData.content.type === 'git') {
    Object.keys(testData.content.repository).forEach(key => {
      expect(testData.content.repository[key]).toEqual(createdTestData.content.repository[key]);
    });
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

  // eslint-disable-next-line no-restricted-syntax
  for (const [name, value] of Object.entries(testSourceData.repository)) {
    expect(createdTestSourceData.repository[name]).toEqual(value);
  }
}

export function validateExecutor(executorData: Partial<ExecutorData>, createdExecutorData: ExecutorData): void {
  expect(executorData.name).toEqual(createdExecutorData.name);
  expect(executorData.image).toEqual(createdExecutorData.executor.image);
  expect(executorData.types).toEqual(createdExecutorData.executor.types);
  expect(executorData.executorType).toEqual(createdExecutorData.executor.executorType);
}
