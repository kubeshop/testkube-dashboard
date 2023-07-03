import { expect } from '@playwright/test';

export class CommonHelpers {
    static validateTest(testData, createdTestData) {
        expect(testData.name).toEqual(createdTestData.name);
        CommonHelpers.validateLabels(testData.labels, createdTestData.labels);
        expect(testData.type).toEqual(createdTestData.type);
        expect(testData.content.type).toEqual(createdTestData.content.type);

        // testSources
        const contentType = testData.content.type;
        if (contentType === "git") {
            for (let key in testData.content.repository) { // eslint-disable-line no-restricted-syntax, guard-for-in
                expect(testData.content.repository[key]).toEqual(createdTestData.content.repository[key]);
            }
        }
    }

    static validateTestSuite(testSuiteData, createdTestSuiteData) {
        expect(testSuiteData.name).toEqual(testSuiteData.name);
        expect(testSuiteData.description).toEqual(createdTestSuiteData.description);
        CommonHelpers.validateLabels(testSuiteData.labels, createdTestSuiteData.labels);
    }

    static validateLabels(labels, createdLabels) {
        for (const [name, value] of Object.entries(labels)) {
            expect(createdLabels[name]).toEqual(value);
        }
    }
}
