import testsData from '../fixtures/tests.json';

export default class TestDataHandler {
    getTest = (testName) => {
        return testsData[testName];
    }
}