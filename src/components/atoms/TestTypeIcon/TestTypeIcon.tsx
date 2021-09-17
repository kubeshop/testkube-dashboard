import React from 'react';

import {Image} from '@atoms';

import PostmanIcon from '@assets/postmanIcon.svg';
import CypressIcon from '@assets/cypressIcon.svg';
import CurlIcon from '@assets/curlIcon.svg';

interface ITestIconType {
  testType: 'cypress/project' | 'postman/collection' | 'curl/test' | '';
  width: number;
  height: number;
}

const TestTypeIcon = ({testType = '', height, width}: ITestIconType) => {
  return (
    <Image
      src={
        testType === 'cypress/project'
          ? CypressIcon
          : testType === 'postman/collection'
          ? PostmanIcon
          : testType === 'curl/test'
          ? CurlIcon
          : ''
      }
      alt={testType}
      type="svg"
      height={height}
      width={width}
    />
  );
};

export default TestTypeIcon;
