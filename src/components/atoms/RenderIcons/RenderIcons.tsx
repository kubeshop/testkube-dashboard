import React from 'react';

import {Image} from '@atoms';

import RunningTestIcon from '@assets/testRunningIcon.svg';
import FailedTestIcon from '@assets/testFailedIcon.svg';
import SuccessTestIcon from '@assets/testSuccessIcon.svg';
import QueuedTestIcon from '@assets/testQueuedIcon.svg';

interface ITestTypes {
  testStatus: 'queued' | 'failed' | 'success' | 'pending';
  width: number;
  height: number;
}

const RenderTestStatusSvgIcon = ({testStatus, width, height}: ITestTypes) => {
  return (
    <Image
      src={
        testStatus === 'pending'
          ? RunningTestIcon
          : testStatus === 'failed'
          ? FailedTestIcon
          : testStatus === 'success'
          ? SuccessTestIcon
          : testStatus === 'queued'
          ? QueuedTestIcon
          : ''
      }
      alt="testStatus"
      type="svg"
      width={width}
      height={height}
    />
  );
};

export default RenderTestStatusSvgIcon;
