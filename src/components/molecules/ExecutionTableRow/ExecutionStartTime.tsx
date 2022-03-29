import moment from 'moment';

import {StyledExecutionStartDate} from './ExecutionTableRow.styled';

export const ExecutionStartTime: React.FC<any> = props => {
  const {startTime, entityType} = props;

  return <StyledExecutionStartDate>{moment(startTime).format('DD MMM, YYYY hh:mm:ss')}</StyledExecutionStartDate>;
};
