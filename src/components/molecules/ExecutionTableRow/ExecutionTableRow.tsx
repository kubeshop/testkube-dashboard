import React, {useContext} from 'react';

import {ExecutionStepIcon} from '@molecules';

import {DashboardInfoPanelContext} from '@contexts';

import ExecutionDuration from './ExecutionDuration';
import {ExecutionName} from './ExecutionName';
import {ExecutionSequenceNumber} from './ExecutionSequenceNumber';
import ExecutionStartDateTime from './ExecutionStartDateTime';
import {StyledChevronRightIcon, StyledSpace} from './ExecutionTableRow.styled';

const leftPadding = 130;
const rightPadding = 94;

const gapWidth = 15;
const durationTimeWidth = 60;

const ExecutionTableRow: React.FC<any> = props => {
  const {
    size: {width},
  } = useContext(DashboardInfoPanelContext);

  const {status, startTime, name, endTime, duration, index} = props;

  const spaceLeft = width ? width - leftPadding - rightPadding : 0;

  const isDurationTextVisible = spaceLeft > 600;
  const isYearCollapsed = spaceLeft > 600;

  const dateTimeWidth = isYearCollapsed ? 110 : 150;

  const isExecutionNameVisible = spaceLeft > dateTimeWidth + gapWidth + durationTimeWidth;
  const executionNameMaxWidth = `${spaceLeft - dateTimeWidth - durationTimeWidth + gapWidth}px`;

  const isExecutionDurationVisible = spaceLeft > dateTimeWidth + gapWidth;

  const isExecutionDateTimeVisible = spaceLeft > 40;
  const startDateTimeMaxWidth = `${spaceLeft + gapWidth}px`;

  return (
    <StyledSpace size={15}>
      {status ? <ExecutionStepIcon icon={status} /> : null}
      <ExecutionSequenceNumber index={index} />
      {isExecutionDateTimeVisible ? (
        <ExecutionStartDateTime
          status={status}
          startTime={startTime}
          endTime={endTime}
          duration={duration}
          maxWidth={startDateTimeMaxWidth}
          collapseYear={isYearCollapsed}
        />
      ) : null}
      {isExecutionDurationVisible ? (
        <ExecutionDuration duration={duration} status={status} isTextVisible={isDurationTextVisible} />
      ) : null}
      {isExecutionNameVisible ? <ExecutionName name={name} maxWidth={executionNameMaxWidth} /> : null}
      <StyledChevronRightIcon />
    </StyledSpace>
  );
};

export default React.memo(ExecutionTableRow);
