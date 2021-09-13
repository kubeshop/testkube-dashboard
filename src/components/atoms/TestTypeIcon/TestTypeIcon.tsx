import React from 'react';

import {Image} from '@atoms';

import PostmanIcon from '@assets/postmanIcon.svg';
import CypressIcon from '@assets/cypressIcon.svg';

interface ITestIconType {
  testType: 'cypress' | 'postman' | '';
  width: number;
  height: number;
}

const TestTypeIcon = ({testType = '', height, width}: ITestIconType) => {
  return (
    <Image
      src={testType === 'cypress' ? CypressIcon : testType === 'postman' ? PostmanIcon : ''}
      alt={testType}
      type="svg"
      height={height}
      width={width}
    />
  );
};

export default TestTypeIcon;
