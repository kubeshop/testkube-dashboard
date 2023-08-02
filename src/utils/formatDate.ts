import {format} from 'date-fns';

import {executionDateFormat} from './strings';

export const formatExecutionDate = (date: Date, formatString = executionDateFormat) => {
  return format(date, formatString);
};

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${duration.toFixed(2)}s`;
};
