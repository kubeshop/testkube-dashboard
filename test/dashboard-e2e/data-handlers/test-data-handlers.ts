import testsData from '../fixtures/tests.json';

export class TestDataHandler {
    static getTest(testName) {
        return testsData[testName];
    }
}