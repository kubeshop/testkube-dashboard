import testsData from '../fixtures/tests.json';
import { v4 as uuidv4 } from 'uuid';

export class TestDataHandler {
    runId: string;
    constructor(runId) {
        this.runId = runId;
    }

    static getRandomId() {
        return uuidv4().replace(/-/g,'');
    }

    getRandomizedName(testName) {
        const maxNameLength = 63 //max name length for k8s resources
        const id = this.runId ? this.runId : TestDataHandler.getRandomId();
        const randomizedTestName = `${testName}-${id}`;
        const croppedTestName = randomizedTestName.substring(0, maxNameLength);
        console.log(`getRandomizedName name: ${croppedTestName}`)

        return croppedTestName;
    }

    getTest(testName) {
        let test = testsData[testName]
        test.name = this.getRandomizedName(test.name)

        return test;
    }
}