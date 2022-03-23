import moment from 'moment';

import {executionDateFormat} from './strings';

export const timeStampToDate = (timeStamp: string) => {
  if (!timeStamp) {
    return '';
  }

  return moment(timeStamp).format('MM-DD-YYYY hh:mm:ss').toString();
};

export const getDuration = (startTime: string, endTime: string) => {
  let duration = moment(endTime).diff(startTime);

  if (duration < 0) {
    duration = moment().diff(startTime);
  }
  return moment.utc(duration).format('mm:ss');
};

export const getDate = (timeStamp: string | any) => {
  return moment(timeStamp).format('MM-DD-YYYY');
};

export const getTodayTests = (timeStamp: any) => {
  const date = new Date();
  const today = date.toISOString();
  return timeStamp?.results?.filter((t: any) => t.startTime === today);
};

export const formatExecutionDate = (date: moment.MomentInput) => {
  return moment(date).format(executionDateFormat);
};
