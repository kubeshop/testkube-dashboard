import {memo} from 'react';
import {useInterval, useUpdate} from 'react-use';

import parser from 'cron-parser';
import {formatDuration, intervalToDuration} from 'date-fns';

type NextExecutionProps = {
  expression?: parser.CronExpression;
  error?: boolean;
};

const getDuration = (expression?: parser.CronExpression, error?: boolean) => {
  if (error) {
    return 'Invalid cron format';
  }
  if (!expression) {
    return 'Not scheduled';
  }
  const start = new Date();
  expression.reset(start);
  const end = expression?.next().toDate();
  const duration = formatDuration(intervalToDuration({start, end}));
  return duration ? `in ${duration}` : 'now';
};

const NextExecution: React.FC<NextExecutionProps> = ({expression, error}) => {
  const duration = getDuration(expression, error);
  const update = useUpdate();

  useInterval(update, 1000);

  return <>{duration}</>;
};

export default memo(NextExecution);
