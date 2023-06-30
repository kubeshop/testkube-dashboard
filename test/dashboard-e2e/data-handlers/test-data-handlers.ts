import testsData from '../fixtures/tests.json';
import testSuitesData from '../fixtures/testsuites.json';
import executorData from '../fixtures/executors.json';
import { v4 as uuidv4 } from 'uuid';

export class TestDataHandler {
    runId: string;
    constructor(runId) {
        this.runId = runId;
    }

    static getRandomId() {
        return uuidv4().replace(/-/g,'');
    }

    getRandomizedName(name) {
        const maxNameLength = 63 //max name length for k8s resources
        const id = this.runId ? this.runId : TestDataHandler.getRandomId();
        const randomizedTestName = `${name}-${id}`;
        const croppedTestName = randomizedTestName.substring(0, maxNameLength);
        
        return croppedTestName;
    }

    getTest(testName) {
        let test = testsData[testName]
        test.name = this.getRandomizedName(test.name)

        return test;
    }

    getTestSuite(testSuiteName) {
        let testSuite = testSuitesData[testSuiteName]
        testSuite.name = this.getRandomizedName(testSuite.name);

        return testSuite;
    }

    getExecutor(executorName) {
        let executor = executorData[executorName]
        executor.name = this.getRandomizedName(executor.name);
        executor.types[0] = this.getRandomizedName(executor.types[0]);

        return executor;
    }
}
