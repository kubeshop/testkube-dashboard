import React from 'react';

import {Image} from '@atoms';

import RunningTestIcon from '@assets/testIconRunningV2.svg';
import FailedTestIcon from '@assets/testIconFailedV2.svg';
import SuccessTestIcon from '@assets/testIconSuccessV2.svg';
import QueuedTestIcon from '@assets/testIconPendingV2.svg';

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
          : testStatus === 'error'
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
