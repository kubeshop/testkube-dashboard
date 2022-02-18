import {TestRunners} from '@models/testSuites';
import {ScriptType} from '@models/tests';

import CurlIcon from '@assets/curlIcon.svg';
import CypressIcon from '@assets/cypressIcon.svg';
import PostmanIcon from '@assets/postmanIconV2.svg';

export const testRunnersNames: {[key in ScriptType]: TestRunners} = {
  'postman/collection': 'Postman',
  'cypress/project': 'Cypress',
  'curl/test': 'Curl',
  'test/curl': 'Curl',
};

export const testRunnerIcons: {[key in ScriptType]: string} = {
  'postman/collection': PostmanIcon,
  'cypress/project': CypressIcon,
  'curl/test': CurlIcon,
  'test/curl': CurlIcon,
};
