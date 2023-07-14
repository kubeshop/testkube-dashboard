import {TestSuite, TestSuiteStep} from '@models/testSuite';

export function isTestSuiteV2(suite: TestSuite): boolean {
  return !Array.isArray(suite.steps?.[0]?.execute || []);
}

export function convertTestSuiteV2ToV3(suite: TestSuite): TestSuite {
  return {
    ...suite,
    steps: suite.steps?.map(step => ({
      ...step,
      execute: ([] as TestSuiteStep[])
        .concat(step.execute!)
        .map(item => ('name' in item ? {test: item.name as string} : item)),
    })),
  };
}
