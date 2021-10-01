import React from 'react';

import {Typography} from '@atoms';

interface ITestStatusProps {
  testTitle: string;
  totalTests: string | undefined;
}

const TestStatus: React.FC<ITestStatusProps> = ({testTitle, totalTests}) => {
  return (
    <>
      <Typography variant="secondary" color="tertiary">
        {testTitle}
      </Typography>
      <Typography variant="quinary" color="quaternary">
        {totalTests || '0'}
      </Typography>
    </>
  );
};

export default TestStatus;
