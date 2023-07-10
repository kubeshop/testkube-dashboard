import testsData from '../fixtures/tests.json';
import testSuitesData from '../fixtures/testsuites.json';
import testSourcesData from '../fixtures/testsources.json';
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

        return {
            ...test,
            name: this.getRandomizedName(test.name),
        };
    }

    getTestSuite(testSuiteName) {
        let testSuite = testSuitesData[testSuiteName]

        return {
            ...testSuite,
            name: this.getRandomizedName(testSuite.name),
        };
    }

    getTestSource(testSourceName) {
        let testSource = testSourcesData[testSourceName]

        return {
            ...testSource,
            name: this.getRandomizedName(testSource.name),
        };
    }

    getExecutor(executorName) {
        let executor = executorData[executorName];

        return {
            ...executor,
            name: this.getRandomizedName(executor.name), 
            types: [ this.getRandomizedName(executor.types[0]), ...executor.types.slice(1) ],
        };
    }
}
