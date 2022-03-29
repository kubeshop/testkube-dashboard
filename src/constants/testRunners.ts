import {TestRunners} from '@models/testSuites';
import {TestType} from '@models/tests';

import CurlIcon from '@assets/curlIcon.svg';
import CypressIcon from '@assets/cypressIcon.svg';
import PostmanIcon from '@assets/postmanIconV2.svg';

export const testRunnersNames: {[key in TestType]: TestRunners} = {
  'postman/collection': 'Postman',
  'postman/custom': 'Postman',
  'cypress/project': 'Cypress',
  'curl/test': 'Curl',
  'test/curl': 'Curl',
};

export const testRunnerIcons: {[key in TestType]: string} = {
  'postman/collection': PostmanIcon,
  'postman/custom': PostmanIcon,
  'cypress/project': CypressIcon,
  'curl/test': CurlIcon,
  'test/curl': CurlIcon,
};
