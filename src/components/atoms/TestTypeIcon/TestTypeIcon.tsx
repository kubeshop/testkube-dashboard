import React from 'react';

import {Image} from '@atoms';
import {findMatchWordInString} from '@utils/validate';

import PostmanIcon from '@assets/postmanIcon.svg';
import CypressIcon from '@assets/cypressIcon.svg';
import CurlIcon from '@assets/curlIcon.svg';

interface ITestIconType {
  testType: string;
  width: number;
  height: number;
}

const TestTypeIcon = ({testType, height, width}: ITestIconType) => {
  return (
    <Image
      src={
        findMatchWordInString('cypress', testType)
          ? CypressIcon
          : findMatchWordInString('postman', testType)
          ? PostmanIcon
          : findMatchWordInString('curl', testType)
          ? CurlIcon
          : ''
      }
      width={width}
      height={height}
      alt={testType}
      type="svg"
    />
  );
};

export default TestTypeIcon;
