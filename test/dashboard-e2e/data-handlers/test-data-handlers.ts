import testsData from '../fixtures/tests.json';
import testSuitesData from '../fixtures/testsuites.json';
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
        console.log('getTestSuite testSuiteName: ')
        console.log(testSuiteName)

        let testSuite = testSuitesData[testSuiteName]
        testSuite.name = this.getRandomizedName(testSuite.name)
        console.log('getTestSuite testSuite.name: ')
        console.log(testSuite.name)

        return testSuite;
    }
}
