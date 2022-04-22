import React, {useContext} from 'react';

import {Execution, ExecutionResultStatusEnum} from '@models/execution';

import {ExecutionStepIcon} from '@molecules';

import {DashboardInfoPanelContext} from '@contexts';

import ExecutionDuration from './ExecutionDuration';
import {ExecutionSequenceNumber} from './ExecutionSequenceNumber';
import ExecutionStartDateTime from './ExecutionStartDateTime';
import {StyledChevronRightIcon, StyledSpace} from './ExecutionTableRow.styled';

const leftPadding = 130;
const rightPadding = 94;

const maxRowWidth = 600;
const gapWidth = 15;
const defaultDateTimeWidth = 150;
const dateTimeWidthWithoutYear = 110;

export type ExecutionTableRowProps = {
  index: number;
  status: ExecutionResultStatusEnum;
  startTime: Execution['startTime'];
  duration: Execution['duration'];
};

const ExecutionTableRow: React.FC<ExecutionTableRowProps> = props => {
  const {
    size: {width},
  } = useContext(DashboardInfoPanelContext);

  const {status, startTime, duration, index} = props;

  const spaceLeft = width ? width - leftPadding - rightPadding : 0;

  const isDurationTextVisible = spaceLeft > maxRowWidth;
  const isYearCollapsed = spaceLeft > maxRowWidth;

  const dateTimeWidth = isYearCollapsed ? dateTimeWidthWithoutYear : defaultDateTimeWidth;

  const isExecutionDurationVisible = spaceLeft > dateTimeWidth + gapWidth;

  const isExecutionDateTimeVisible = spaceLeft > 40;

  return (
    <StyledSpace size={15}>
      {status ? <ExecutionStepIcon icon={status} /> : null}
      <ExecutionSequenceNumber index={index} />
      {isExecutionDateTimeVisible ? (
        <ExecutionStartDateTime startTime={startTime} collapseYear={isYearCollapsed} />
      ) : null}
      {isExecutionDurationVisible ? (
        <ExecutionDuration duration={duration} status={status} isTextVisible={isDurationTextVisible} />
      ) : null}
      <StyledChevronRightIcon />
    </StyledSpace>
  );
};

export default React.memo(ExecutionTableRow);
