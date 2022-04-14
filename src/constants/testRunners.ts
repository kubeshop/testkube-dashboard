import {TestRunners} from '@models/testSuites';
import {TestType} from '@models/tests';

export const testRunnersNames: {[key in TestType]: TestRunners} = {
  'postman/collection': 'Postman',
  'postman/custom': 'Postman',
  'cypress/project': 'Cypress',
  'curl/test': 'Curl',
  'test/curl': 'Curl',
  'k6/script': 'K6',
  unknown: 'Unknown test type',
};
