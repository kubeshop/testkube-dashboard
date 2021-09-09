import React from 'react';

import {Image} from '@atoms';

interface ITestIconType {
  testType: 'cypress' | 'postman' | '';
  width: number;
  height: number;
}

const TestTypeIcon = ({testType = '', height, width}: ITestIconType) => {
  return (
    <Image
      src={testType === 'cypress' ? 'Cypress' : testType === 'postman' ? 'Postman' : ''}
      alt={testType}
      type="svg"
      height={height}
      width={width}
    />
  );
};

export default TestTypeIcon;
