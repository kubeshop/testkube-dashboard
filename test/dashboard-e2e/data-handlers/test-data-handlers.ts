import testsData from '../fixtures/tests.json';

export class TestDataHandler {
    getTest(testName) {  // eslint-disable-line class-methods-use-this
        return testsData[testName];
    }
}