import React from 'react';

import {Image} from '@atoms';

import RunningTestIcon from '@assets/testIconRunningV2.svg';
import FailedTestIcon from '@assets/testIconFailedV2.svg';
import SuccessTestIcon from '@assets/testIconSuccessV2.svg';
import genericTestTypeIcon from '@assets/docIconV2.svg';

interface ITestTypes {
  testStatus: string;
  width?: number;
  height?: number;
}

const RenderTestStatusSvgIcon = ({testStatus, width, height}: ITestTypes) => {
  return (
    <Image
      src={
        testStatus === 'pending'
          ? RunningTestIcon
          : testStatus === 'failed'
          ? FailedTestIcon
          : testStatus === 'passed'
          ? SuccessTestIcon
          : genericTestTypeIcon
      }
      alt={testStatus}
      type="svg"
      width={width}
      height={height}
    />
  );
};

export default RenderTestStatusSvgIcon;
