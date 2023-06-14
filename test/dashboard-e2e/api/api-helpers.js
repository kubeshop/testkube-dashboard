import superagent from 'superagent';

export class ApiHelpers {
    constructor(apiUrl, cloudContext='', bearerToken='') {
        this.API_URL = apiUrl;
        this.CLOUD_CONTEXT = cloudContext;
        this.BEARER_TOKEN = bearerToken;
    }

    async getTests() {
        const request = `${this.API_URL}/tests`;

        try {
            if(!this.CLOUD_CONTEXT) {
                const response = await superagent.get(request);

                return response.body;
            } 
                const response = await superagent.get(request)
                    .set('Authorization', `Bearer ${this.BEARER_TOKEN}`);

                return JSON.parse(response.text);
            
        } catch (e) {
            throw Error(`getTests failed on "${request}" with: "${e}"`);
        }
    }

    async createTest(testData) {
        const request = `${this.API_URL}/tests`;
        
        try {
            if(!this.CLOUD_CONTEXT) {
                const response = await superagent.post(request)
                    .set('Content-Type', 'application/json')
                    .send(testData);
    
                return response.body;
            } 
                const response = await superagent.post(request)
                    .set('Content-Type', 'application/json')
                    .set('Authorization', `Bearer ${this.BEARER_TOKEN}`)
                    .send(testData);

                return JSON.parse(response.text);
            
        } catch (e) {
            throw Error(`createTest failed on "${request}" with: "${e}"`);
        }
    }

    async abortTest(testName, executionId) {
        const request = `${this.API_URL}/tests/${testName}/executions/${executionId}`;

        try {
            if(!this.CLOUD_CONTEXT) {
                return await superagent.patch(request);
            } 
                return await superagent.patch(request)
                    .set('Authorization', `Bearer ${this.BEARER_TOKEN}`);
            
        } catch (e) {
            throw Error(`abortTest failed on "${request}" with: "${e}"`);
        }
    }
    
    async removeTest(testName) {
        const request = `${this.API_URL}/tests/${testName}`;

        try {
            if(!this.CLOUD_CONTEXT) {
                await superagent.delete(request);
            } else {
                await superagent.delete(request)
                    .set('Authorization', `Bearer ${this.BEARER_TOKEN}`);
            }
        } catch (e) {
            throw Error(`removeTest failed on "${request}" with: "${e}"`);
        }
    }

    async updateTest(testData) {
        const request = `${this.API_URL}/tests/${testData.name}`;
        
        try {
            if(!this.CLOUD_CONTEXT) {
                const response = await superagent.patch(request)
                    .set('Content-Type', 'application/json')
                    .send(testData);
    
                return response.body;
            } 
                const response = await superagent.patch(request)
                    .set('Content-Type', 'application/json')
                    .set('Authorization', `Bearer ${this.BEARER_TOKEN}`)
                    .send(testData);
    
                return JSON.parse(response.text);
            
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
        const request = `${this.API_URL}/tests/${testName}`;

        try {
            if(!this.CLOUD_CONTEXT) {
                const response = await superagent.get(request);

                return response.body;
            } 
                const response = await superagent.get(request)
                    .set('Authorization', `Bearer ${this.BEARER_TOKEN}`);

                return JSON.parse(response.text);
            
        } catch (e) {
            throw Error(`getTestData failed on "${request}" with: "${e}"`);
        }
    }

    async getLastExecutionNumber(testName) {
        const request = `${this.API_URL}/tests/${testName}/executions`;

        try {
            let response;

            if(!this.CLOUD_CONTEXT) {
                response = await superagent.get(request);
            } else {
                response = await superagent.get(request)
                    .set('Authorization', `Bearer ${this.BEARER_TOKEN}`);
            }

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
}