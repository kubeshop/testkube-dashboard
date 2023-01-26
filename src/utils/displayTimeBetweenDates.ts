import {differenceInSeconds, format} from 'date-fns';

interface TimeFormat {
  short: string;
  long: string;
}

export const displayTimeBetweenDates = (left: Date, right: Date): TimeFormat => {
  const FEW_SECONDS = 10;
  const MINUTE = 60;
  const HOUR = 60 * 60; // 3600;
  const TWO_HOURS = 2 * 60 * 60; // 7200;
  const DAY = 24 * 60 * 60; // 86400;
  const TWO_DAYS = 2 * 24 * 60 * 60; // 172800;
  const MONTH = 30 * 24 * 60 * 60; // 2592000;
  const durationInSeconds = differenceInSeconds(left, right);

  // future
  if (durationInSeconds < 0 && Math.abs(durationInSeconds) < FEW_SECONDS)
    return {
      long: 'shortly',
      short: 'now',
    };

  if (durationInSeconds < 0 && Math.abs(durationInSeconds) >= FEW_SECONDS) {
    return {
      long: `${format(left, 'MMMM d, yyyy')}`,
      short: `${format(left, 'MMM d')}`,
    };
  }

  if (durationInSeconds >= 0 && durationInSeconds < FEW_SECONDS)
    // within the last few seconds
    return {
      long: 'just now',
      short: 'now',
    };

  // within the last minute
  if (durationInSeconds >= FEW_SECONDS && durationInSeconds < MINUTE)
    return {
      long: 'a minute ago',
      short: '1 m',
    };

  // within 59 minutes
  if (MINUTE >= 60 && durationInSeconds < HOUR)
    return {
      long: `${Math.floor(durationInSeconds / MINUTE)} minutes ago`,
      short: `${Math.floor(durationInSeconds / MINUTE)} m`,
    };

  // 1 hour
  if (durationInSeconds >= HOUR && durationInSeconds < TWO_HOURS)
    return {
      long: `1 hour ago`,
      short: `1 h`,
    };

  // hours
  if (durationInSeconds >= TWO_HOURS && durationInSeconds < DAY)
    return {
      long: `${Math.floor(durationInSeconds / HOUR)} hours ago`,
      short: `${Math.floor(durationInSeconds / HOUR)} h`,
    };

  // day
  if (durationInSeconds >= DAY && durationInSeconds < TWO_DAYS)
    return {
      long: `yesterday`,
      short: `1 d`,
    };

  // days
  if (durationInSeconds >= TWO_DAYS && durationInSeconds < MONTH)
    return {
      long: `${Math.floor(durationInSeconds / DAY)} days ago`,
      short: `${Math.floor(durationInSeconds / DAY)} d`,
    };

  return {
    long: `${format(right, 'MMMM d, yyyy')}`,
    short: `${format(right, 'MMM d')}`,
  };
};
