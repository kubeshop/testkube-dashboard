import {v4 as uuidv4} from 'uuid';

import executorData from '../fixtures/executors';
import testsData from '../fixtures/tests';
import testSourcesData from '../fixtures/testsources';
import testSuitesData from '../fixtures/testsuites';

// TODO: Use functions instead
export class TestDataHandler {
  public runId: string | undefined;

  public constructor(runId: string | undefined) {
    this.runId = runId;
  }

  public static getRandomId(): string {
    return uuidv4().replace(/-/g, '');
  }

  public getRandomizedName(name: string): string {
    const maxNameLength = 63; // Max name length for k8s resources
    const id = this.runId ? this.runId : TestDataHandler.getRandomId();
    const randomizedTestName = `${name}-${id}`;
    return randomizedTestName.substring(0, maxNameLength);
  }

  public getTest(testName: string): any {
    const test = (testsData as any)[testName];
    return {
      ...test,
      name: this.getRandomizedName(test.name),
    };
  }

  public getTestSuite(testSuiteName: string): any {
    const testSuite = (testSuitesData as any)[testSuiteName];
    return {
      ...testSuite,
      name: this.getRandomizedName(testSuite.name),
    };
  }

  public getTestSource(testSourceName: string): any {
    let testSource = (testSourcesData as any)[testSourceName];

    return {
      ...testSource,
      name: this.getRandomizedName(testSource.name),
    };
  }

  public getExecutor(executorName: string): any {
    const executor = (executorData as any)[executorName];
    return {
      ...executor,
      name: this.getRandomizedName(executor.name),
      types: [this.getRandomizedName(executor.types[0]), ...executor.types.slice(1)],
    };
  }
}
