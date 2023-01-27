import {differenceInSeconds, format} from 'date-fns';

interface TimeFormat {
  short: string;
  long: string;
}

export const displayTimeBetweenDates = (left: Date, right: Date): TimeFormat => {
  const FEW_SECONDS = 30;
  const MINUTE = 60;
  const MINUTE_AND_HALF = 90;
  const HOUR = 60 * MINUTE; // 3600s;
  const TWO_HOURS = 2 * HOUR; // 7200s;
  const DAY = 24 * HOUR; // 86400s;
  const TWO_DAYS = 2 * DAY; // 172800s;
  const MONTH = 30 * DAY; // 2592000s;
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
  if (durationInSeconds >= FEW_SECONDS && durationInSeconds < MINUTE_AND_HALF)
    return {
      long: 'a minute ago',
      short: '1 m',
    };

  // within 59 minutes
  if (durationInSeconds >= MINUTE_AND_HALF && durationInSeconds < HOUR) {
    const value = Math.round(durationInSeconds / MINUTE);
    return {
      long: value > 1 ? `${value} minutes ago` : '1 minute ago',
      short: `${value} m`,
    };
  }

  // 1 hour
  if (durationInSeconds >= HOUR && durationInSeconds < TWO_HOURS)
    return {
      long: `1 hour ago`,
      short: `1 h`,
    };

  // hours
  if (durationInSeconds >= TWO_HOURS && durationInSeconds < DAY)
    return {
      long: `${Math.round(durationInSeconds / HOUR)} hours ago`,
      short: `${Math.round(durationInSeconds / HOUR)} h`,
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
      long: `${Math.round(durationInSeconds / DAY)} days ago`,
      short: `${Math.round(durationInSeconds / DAY)} d`,
    };

  return {
    long: `${format(right, 'MMMM d, yyyy')}`,
    short: `${format(right, 'MMM d')}`,
  };
};
