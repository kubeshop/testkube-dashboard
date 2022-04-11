import {TestRunners} from '@models/testSuites';
import {TestType} from '@models/tests';

import CurlIcon from '@assets/curlLogo.svg';
import CypressIcon from '@assets/cypressIcon.svg';
import K6Icon from '@assets/k6Icon.svg';
import PostmanIcon from '@assets/postmanIconV2.svg';
import UnknownIcon from '@assets/unknownIcon.svg';

export const testRunnersNames: {[key in TestType]: TestRunners} = {
  'postman/collection': 'Postman',
  'postman/custom': 'Postman',
  'cypress/project': 'Cypress',
  'curl/test': 'Curl',
  'test/curl': 'Curl',
  'k6/script': 'K6',
  unknown: 'Unknown test type',
};

export const testRunnerIcons: {[key in TestType]: string} = {
  'postman/collection': PostmanIcon,
  'postman/custom': PostmanIcon,
  'cypress/project': CypressIcon,
  'curl/test': CurlIcon,
  'test/curl': CurlIcon,
  'k6/script': K6Icon,
  unknown: UnknownIcon,
};
