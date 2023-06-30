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
            throw Error(`createTest failed on "${requestUrl}" with: "${e}"`);
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
            throw Error(`updateTest failed on "${requestUrl}" with: "${e}"`);
        }
    }

    async makeDelete(requestUrl) {
        try {
            await superagent.delete(requestUrl)
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '');
        } catch (e) {
            throw Error(`removeTest failed on "${requestUrl}" with: "${e}"`);
        }
    }

    async getTests() {
        const requestUrl = `${this.apiUrl}/tests`;

        return await this.makeGet(requestUrl);
    }

    async getTestSuites() {
        const requestUrl = `${this.apiUrl}/test-suites`;

        return await this.makeGet(requestUrl);
    }

    async getExecutors() {
        const requestUrl = `${this.apiUrl}/executors`;

        return await this.makeGet(requestUrl);
    }

    async createTest(testData) {
        const requestUrl = `${this.apiUrl}/tests`;

        return await this.makePost(requestUrl, testData);
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

        return await this.makeDelete(requestUrl);
    }

    async removeTestSuite(testSuiteName) {
        const requestUrl = `${this.apiUrl}/test-suites/${testSuiteName}`;

        return await this.makeDelete(requestUrl);
    }

    async removeExecutor(executorName) {
        const requestUrl = `${this.apiUrl}/executors/${executorName}`;

        return await this.makeDelete(requestUrl);
    }

    async updateTest(testData) {
        const requestUrl = `${this.apiUrl}/tests/${testData.name}`;
        
        return await this.makePatch(requestUrl, testData);
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
            const executor = currentExecutors.find(singleExecutor => singleExecutor.name === executorName);
    
            if(executor !== undefined) {
                return true;
            }
    
            return false;
        } catch (e) {
            throw Error(`isExecutorCreated failed for "${executorName}" with: "${e}"`);
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

            return true;
        } catch (e) {
            throw Error(`assureExecutorNotCreated failed for "${executorName}" with: "${e}"`);
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

        return await this.makeGet(requestUrl);
    }

    async getTestSuiteData(testSuiteName) {
        const requestUrl = `${this.apiUrl}/test-suites/${testSuiteName}`;

        return await this.makeGet(requestUrl);
    }

    async getExecutorData(executorName) {
        const requestUrl = `${this.apiUrl}/executors/${executorName}`;

        return await this.makeGet(requestUrl);
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
