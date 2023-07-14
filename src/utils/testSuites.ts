import {TestSuite, TestSuiteStep} from '@models/testSuite';
import {TestSuiteExecution} from '@models/testSuiteExecution';

type TestSuiteExecutionMaybeV2 = TestSuiteExecution & {stepResults?: any};

export function isTestSuiteV2(suite: TestSuite): boolean {
  return !Array.isArray(suite.steps?.[0]?.execute || []);
}

function mapExecute(execute: any): TestSuiteStep[] {
  if (!execute) {
    return [];
  }
  return ([] as TestSuiteStep[]).concat(execute!).map(item => ('name' in item ? {test: item.name as string} : item));
}

export function convertTestSuiteV2ToV3(suite: TestSuite): TestSuite {
  return {
    ...suite,
    steps: suite.steps?.map(step => ({
      ...step,
      execute: mapExecute(step.execute!),
    })),
  };
}

export function isTestSuiteV2Execution(execution: TestSuiteExecutionMaybeV2): boolean {
  return Boolean(execution.stepResults);
}

export function convertTestSuiteV2ExecutionToV3(execution: TestSuiteExecutionMaybeV2): TestSuiteExecution {
  const {stepResults, ...rest} = execution;
  return {
    ...rest,
    executeStepResults: stepResults.map((result: any) => ({
      execute: [{execution: result.execution, step: mapExecute(result.step.execute)?.[0]}],
      step: {...result.step, execute: mapExecute(result.step.execute)},
    })),
  };
}
