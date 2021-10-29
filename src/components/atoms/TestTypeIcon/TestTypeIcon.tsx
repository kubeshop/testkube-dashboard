import React from 'react';

import {Image} from '@atoms';
import {findMatchWordInString} from '@utils';

import PostmanIcon from '@assets/postmanIcon.svg';
import CypressIcon from '@assets/cypressIcon.svg';
import CurlIcon from '@assets/curlIcon.svg';
import genericTestTypeIcon from '@assets/genericTestTypeIcon.svg';

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
          : genericTestTypeIcon
      }
      width={width}
      height={height}
      alt={testType}
      type="svg"
    />
  );
};

export default TestTypeIcon;
