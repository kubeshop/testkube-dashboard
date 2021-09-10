import React from 'react';

import {Image} from '@atoms';

import PostmanIcon from '@assets/postmanLogo.png';

interface ITestIconType {
  testType: 'cypress' | 'postman' | '';
  width: number;
  height: number;
}

const TestTypeIcon = ({testType = '', height, width}: ITestIconType) => {
  return (
    <Image
      src={testType === 'cypress' ? 'Cypress' : testType === 'postman' ? PostmanIcon : ''}
      alt={testType}
      type="svg"
      height={height}
      width={width}
    />
  );
};

export default TestTypeIcon;
