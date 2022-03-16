import moment from 'moment';

import {StyledExecutionStartDate} from './ExecutionTableRow.styled';

export const ExecutionStartTime = (props: any) => {
  const {startTime} = props;

  return <StyledExecutionStartDate>{moment(startTime).format('DD MMM, YYYY hh:mm:ss')}</StyledExecutionStartDate>;
};
