import superagent from 'superagent';

export class ApiHelpers {
    constructor(apiUrl, cloudContext, bearerToken) {
        this.apiUrl = apiUrl;
        this.cloudContext = cloudContext;
        this.bearerToken = bearerToken;
    }

    async getTests() {
        const request = `${this.apiUrl}/tests`;

        try {
            const response = await superagent.get(request)
                .set('Content-Type', 'application/json')
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '');

            return ApiHelpers.parseResponse(response);
            
        } catch (e) {
            throw Error(`getTests failed on "${request}" with: "${e}"`);
        }
    }

    async getTestSuites() {
        const request = `${this.apiUrl}/test-suites`;

        try {
            const response = await superagent.get(request)
                .set('Content-Type', 'application/json')
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '');

            return ApiHelpers.parseResponse(response);
            
        } catch (e) {
            throw Error(`getTestSuites failed on "${request}" with: "${e}"`);
        }
    }

    async createTest(testData) {
        const request = `${this.apiUrl}/tests`;
        
        try {
            const response = await superagent.post(request)
                .set('Content-Type', 'application/json')
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '')
                .send(testData);

            return ApiHelpers.parseResponse(response);
        } catch (e) {
            throw Error(`createTest failed on "${request}" with: "${e}"`);
        }
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
        const request = `${this.apiUrl}/tests/${testName}`;

        try {
            await superagent.delete(request)
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '');
        } catch (e) {
            throw Error(`removeTest failed on "${request}" with: "${e}"`);
        }
    }

    async removeTestSuite(testSuiteName) {
        const request = `${this.apiUrl}/test-suites/${testSuiteName}`;

        try {
            await superagent.delete(request)
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '');
        } catch (e) {
            throw Error(`removeTestSuite failed on "${request}" with: "${e}"`);
        }
    }

    async updateTest(testData) {
        const request = `${this.apiUrl}/tests/${testData.name}`;
        
        try {
            const response = await superagent.patch(request)
                .set('Content-Type', 'application/json')
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '')
                .send(testData);

            return ApiHelpers.parseResponse(response);
        } catch (e) {
            throw Error(`updateTest failed on "${request}" with: "${e}"`);
        }
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
        const request = `${this.apiUrl}/tests/${testName}`;

        try {
            const response = await superagent.get(request)
                .set('Content-Type', 'application/json')
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '');

            return ApiHelpers.parseResponse(response);
        } catch (e) {
            throw Error(`getTestData failed on "${request}" with: "${e}"`);
        }
    }

    async getTestSuiteData(testSuiteName) {
        const request = `${this.apiUrl}/test-suites/${testSuiteName}`;

        try {
            const response = await superagent.get(request)
                .set('Content-Type', 'application/json')
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '');

            return ApiHelpers.parseResponse(response);
        } catch (e) {
            throw Error(`getTestSuiteData failed on "${request}" with: "${e}"`);
        }
    }

    async getLastExecutionNumber(testName) {
        const request = `${this.apiUrl}/tests/${testName}/executions`;

        try {
            const response = await superagent.get(request)
                .set('Content-Type', 'application/json')
                .set('Authorization', this.cloudContext ? `Bearer ${this.bearerToken}` : '');

            const totalsResults = response.body.totals.results;
    
            if(totalsResults === 0) {
                return totalsResults;
            }
            
            const lastExecutionResults = response.body.results[0];

            return lastExecutionResults.number;

        } catch (e) {
            throw Error(`getLastExecutionNumber failed on "${request}" with: "${e}"`);
        }
    }

    static parseResponse(response) {
        // Cloud is missing the `content-type`, so there is no JSON response in `response.body`
        return JSON.parse(response.text);
    }
}
