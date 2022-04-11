import React, {useContext} from 'react';

import {ExecutionStepIcon} from '@molecules';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {DashboardInfoPanelContext} from '@contexts';

import {ExecutionName} from './ExecutionName';
import {ExecutionSequenceNumber} from './ExecutionSequenceNumber';
import {ExecutionStartEndTime} from './ExecutionStartEndTime';
import {StyledChevronRightIcon, StyledSpace} from './ExecutionTableRow.styled';

const leftPadding = 130;
const rightPadding = 94;

const ExecutionTableRow: React.FC<any> = props => {
  const {isSecondLevelOpen} = useContext(DashboardContext);
  const {
    size: {width},
  } = useContext(DashboardInfoPanelContext);

  const {status, startTime, name, endTime, duration, index} = props;

  const spaceLeft = width ? width - leftPadding - rightPadding : 0;

  const isExecutionStartEndTimeVisible = Boolean(width && width > 150 && !isSecondLevelOpen);
  const isExecutionNameVisible = width && width > 250;
  const spaceLeftDivCoef = isExecutionNameVisible ? 2 : 1;
  const startEndTimeMaxWidth = isExecutionStartEndTimeVisible ? `${spaceLeft / spaceLeftDivCoef}px` : '0px';
  const executionNameCoff = isExecutionStartEndTimeVisible ? 2 : 1;
  const executionNameMaxWidth = isExecutionNameVisible ? `${spaceLeft / executionNameCoff}px` : '0px';

  return (
    <StyledSpace size={15}>
      {status ? <ExecutionStepIcon icon={status} /> : null}
      <ExecutionSequenceNumber index={index} />
      {!isSecondLevelOpen ? (
        <ExecutionStartEndTime
          status={status}
          startTime={startTime}
          endTime={endTime}
          duration={duration}
          maxWidth={startEndTimeMaxWidth}
        />
      ) : null}
      <ExecutionName name={name} maxWidth={executionNameMaxWidth} />
      <StyledChevronRightIcon />
    </StyledSpace>
  );
};

export default ExecutionTableRow;
