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
        expect(testSuiteData.name).toEqual(createdTestSuiteData.name);
        expect(testSuiteData.description).toEqual(createdTestSuiteData.description);
        CommonHelpers.validateLabels(testSuiteData.labels, createdTestSuiteData.labels);
    }

    static validateTestSource(testSourceData, createdTestSourceData) {
        expect(testSourceData.name).toEqual(createdTestSourceData.name);

        for (const [name, value] of Object.entries(testSourceData.repository)) {
            expect(createdTestSourceData.repository[name]).toEqual(value);
        }
    }

    static validateExecutor(executorData, createdExecutorData) {
        expect(executorData.name).toEqual(createdExecutorData.name);
        expect(executorData.image).toEqual(createdExecutorData.executor.image);
        expect(executorData.types).toEqual(createdExecutorData.executor.types);
        expect(executorData.executorType).toEqual(createdExecutorData.executor.executorType);
    }

    static validateLabels(labels, createdLabels) {
        for (const [name, value] of Object.entries(labels)) {
            expect(createdLabels[name]).toEqual(value);
        }
    }
}
