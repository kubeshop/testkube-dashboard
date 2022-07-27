import {Duration, format} from 'date-fns';
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

export const formatExecutionDate = (date: Date, formatString = executionDateFormat) => {
  return format(date, formatString);
};

export const constructExecutedString = (duration: Duration, countToDisplay: number = 2) => {
  let finishString = '';
  let counter = 0;

  Object.entries(duration).forEach(([key, value]) => {
    /* Here we assume that Duration entity has a stable order of fields as said in their docs
      type Duration = {
        years?: number
        months?: number
        weeks?: number
        days?: number
        hours?: number
        minutes?: number
        seconds?: number
      }
    */
    if (value && counter < countToDisplay) {
      finishString += `${value}${key[0]} `;
      counter += 1;
    }
  });

  return finishString.trim();
};
