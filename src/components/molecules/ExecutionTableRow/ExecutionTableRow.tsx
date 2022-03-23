import React, {useContext} from 'react';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {ExecutionName} from './ExecutionName';
import {ExecutionSequenceNumber} from './ExecutionSequenceNumber';
import {ExecutionStartEndTime} from './ExecutionStartEndTime';
import {ExecutionStatus} from './ExecutionStatus';
import {StyledChevronRightIcon, StyledSpace} from './ExecutionTableRow.styled';

const ExecutionTableRow: React.FC<any> = props => {
  const {entityType, isSecondLevelOpen} = useContext(DashboardContext);

  const {status, startTime, name, endTime, duration, index} = props;

  return (
    <StyledSpace size={15}>
      <ExecutionStatus icon={status} />
      <ExecutionSequenceNumber index={index} />
      {!isSecondLevelOpen ? (
        <ExecutionStartEndTime startTime={startTime} endTime={endTime} duration={duration} />
      ) : null}
      <ExecutionName name={name} />
      <StyledChevronRightIcon />
    </StyledSpace>
  );
};

export default ExecutionTableRow;
