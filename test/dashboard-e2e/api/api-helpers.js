import superagent from 'superagent';

export class ApiHelpers {
    constructor(apiUrl, cloudContext, bearerToken) {
        this.apiUrl = apiUrl;
        this.cloudContext = cloudContext;
        this.bearerToken = bearerToken;
    }

    async makeGet(requestUrl) {
        try {
            const response = await superagent.get(requestUrl)
                .set('Content-Type', 'application/json')
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '');

            return ApiHelpers.parseResponse(response);
            
        } catch (e) {
            throw Error(`makeGet failed on "${requestUrl}" with: "${e}"`);
        }
    }

    async makePost(requestUrl, requestData) {
        try {
            const response = await superagent.post(requestUrl)
                .set('Content-Type', 'application/json')
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '')
                .send(requestData);

            return ApiHelpers.parseResponse(response);
        } catch (e) {
            throw Error(`makePost failed on "${requestUrl}" with: "${e}"`);
        }
    }

    async makePatch(requestUrl, requestData) {
        try {
            const response = await superagent.patch(requestUrl)
                .set('Content-Type', 'application/json')
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '')
                .send(requestData);

            return ApiHelpers.parseResponse(response);
        } catch (e) {
            throw Error(`makePatch failed on "${requestUrl}" with: "${e}"`);
        }
    }

    async makeDelete(requestUrl) {
        try {
            await superagent.delete(requestUrl)
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '');
        } catch (e) {
            throw Error(`makeDelete failed on "${requestUrl}" with: "${e}"`);
        }
    }

    async getTests() {
        const requestUrl = `${this.apiUrl}/tests`;

        return this.makeGet(requestUrl);
    }

    async getTestSuites() {
        const requestUrl = `${this.apiUrl}/test-suites`;

        return this.makeGet(requestUrl);
    }

    async getTestSources() {
        const requestUrl = `${this.apiUrl}/test-sources`;

        return this.makeGet(requestUrl);
    }

    async getExecutors() {
        const requestUrl = `${this.apiUrl}/executors`;

        return this.makeGet(requestUrl);
    }

    async createTest(testData) {
        const requestUrl = `${this.apiUrl}/tests`;

        return this.makePost(requestUrl, testData);
    }

    async abortTest(testName, executionId) {
        const request = `${this.apiUrl}/tests/${testName}/executions/${executionId}`;

        try {
            return await superagent.patch(request)
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '');
            
        } catch (e) {
            throw Error(`abortTest failed on "${request}" with: "${e}"`);
        }
    }
    
    async removeTest(testName) {
        const requestUrl = `${this.apiUrl}/tests/${testName}`;
        
        return this.makeDelete(requestUrl);
    }

    async removeTestSuite(testSuiteName) {
        const requestUrl = `${this.apiUrl}/test-suites/${testSuiteName}`;

        return this.makeDelete(requestUrl);
    }

    async removeTestSource(testSourceName) {
        const requestUrl = `${this.apiUrl}/test-sources/${testSourceName}`;

        return this.makeDelete(requestUrl);
    }

    async removeExecutor(executorName) {
        const requestUrl = `${this.apiUrl}/executors/${executorName}`;

        return this.makeDelete(requestUrl);
    }

    async updateTest(testData) {
        const requestUrl = `${this.apiUrl}/tests/${testData.name}`;
        
        return this.makePatch(requestUrl, testData);
    }

    async isTestCreated(testName) {
        try {
            const currentTests = await this.getTests();
            const test = currentTests.find(singleTest => singleTest.name === testName);
    
            if(test !== undefined) {
                return true;
            }
    
            return false;
        } catch (e) {
            throw Error(`isTestCreated failed for "${testName}" with: "${e}"`);
        }
    }

    async isTestSuiteCreated(testSuiteName) {
        try {
            const currentTestSuites = await this.getTestSuites();
            const testSuite = currentTestSuites.find(singleTestSuite => singleTestSuite.name === testSuiteName);
    
            if(testSuite !== undefined) {
                return true;
            }
    
            return false;
        } catch (e) {
            throw Error(`isTestSuiteCreated failed for "${testSuiteName}" with: "${e}"`);
        }
    }

    async isExecutorCreated(executorName) {
        try {
            const currentExecutors = await this.getExecutors();
            
            return currentExecutors.some(({name}) => name === executorName);
        } catch (e) {
            throw Error(`isExecutorCreated failed for "${executorName}" with: "${e}"`);
        }
    }

    async isTestSourceCreated(testSourceName) {
        try {
            const currentTestSources = await this.getTestSources();
            
            return currentTestSources.some(({name}) => name === testSourceName);
        } catch (e) {
            throw Error(`isTestSourceCreated failed for "${testSourceName}" with: "${e}"`);
        }
    }

    async assureTestNotCreated(testName) {
        try {
            const alreadyCreated = await this.isTestCreated(testName);
            if(alreadyCreated) {
                await this.removeTest(testName);
            }
    
            return true;
        } catch (e) {
            throw Error(`assureTestNotCreated failed for "${testName}" with: "${e}"`);
        }
    }

    async assureTestSuiteNotCreated(testSuiteName) {
        try {
            const alreadyCreated = await this.isTestSuiteCreated(testSuiteName);
            if(alreadyCreated) {
                await this.removeTestSuite(testSuiteName);
            }

            return true;
        } catch (e) {
            throw Error(`assureTestSuiteNotCreated failed for "${testSuiteName}" with: "${e}"`);
        }
    }

    async assureExecutorNotCreated(executorName) {
        try {
            const alreadyCreated = await this.isExecutorCreated(executorName);
            if(alreadyCreated) {
                await this.removeExecutor(testSuiteName);
            }

        } catch (e) {
            throw Error(`assureExecutorNotCreated failed for "${executorName}" with: "${e}"`);
        }
    }

    async assureTestSourceNotCreated(testSourceName) {
        try {
            const alreadyCreated = await this.isTestSourceCreated(testSourceName);
            if(alreadyCreated) {
                await this.removeTestSource(testSourceName);
            }

        } catch (e) {
            throw Error(`assureTestSourceNotCreated failed for "${testSourceName}" with: "${e}"`);
        }
    }

    async assureTestCreated(testData, fullCleanup=false) {
        try {
            const alreadyCreated = await this.isTestCreated(testData.name);

            if(alreadyCreated) {
                if(fullCleanup) {
                    await this.removeTest(testData.name);
                    await this.createTest(testData);
                } else {
                    await this.updateTest(testData);
               }
            } else {
                await this.createTest(testData);
            }
        } catch (e) {
            throw Error(`assureTestCreated failed for "${testData.name}" with: "${e}"`);
        }
    }

    async getTestData(testName) {
        const requestUrl = `${this.apiUrl}/tests/${testName}`;

        return this.makeGet(requestUrl);
    }

    async getTestSuiteData(testSuiteName) {
        const requestUrl = `${this.apiUrl}/test-suites/${testSuiteName}`;

        return this.makeGet(requestUrl);
    }

    async getTestSourceData(testSourceName) {
        const requestUrl = `${this.apiUrl}/test-sources/${testSourceName}`;

        return this.makeGet(requestUrl);
    }

    async getExecutorData(executorName) {
        const requestUrl = `${this.apiUrl}/executors/${executorName}`;

        return this.makeGet(requestUrl);
    }

    async getLastExecutionNumber(testName) {
        const requestUrl = `${this.apiUrl}/tests/${testName}/executions`;

        try {
            const response = await this.makeGet(requestUrl);
            const totalsResults = response.totals.results;
    
            if(totalsResults === 0) {
                return totalsResults;
            }
            
            const lastExecutionResults = response.results[0];

            return lastExecutionResults.number;

        } catch (e) {
            throw Error(`getLastExecutionNumber failed on "${requestUrl}" with: "${e}"`);
        }
    }

    static parseResponse(response) {
        // Cloud is missing the `content-type`, so there is no JSON response in `response.body`
        return JSON.parse(response.text);
    }
}
