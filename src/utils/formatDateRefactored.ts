import {format} from 'date-fns'

interface TimeFormat {
  short: string;
  long: string;
}

export const timeElapsedSince = (now: number) => (past: number): TimeFormat => {

  const durationInSeconds = now - past

  // within the last few seconds
  if (durationInSeconds >= 0 && durationInSeconds < 10) return {
    long: 'just now',
    short: 'now',
  }

  // within the last minute
  if (durationInSeconds >= 10 && durationInSeconds < 60) return {
    long: 'a minute ago',
    short: '1 m',
  }

  // within 59 minutes
  if (durationInSeconds >= 60 && durationInSeconds < 3600) return {
    long: `${Math.floor(durationInSeconds / 60)} minutes ago`,
    short: `${Math.floor(durationInSeconds / 60)} m`,
  }

  // 1 hour
  if (durationInSeconds >= 3600 && durationInSeconds < 7200) return {
    long: `1 hour ago`,
    short: `1 h`,
  }

  // hours
  if (durationInSeconds >= 7200 && durationInSeconds < 86400) return {
    long: `${Math.floor(durationInSeconds / (60 * 60))} hours ago`,
    short: `${Math.floor(durationInSeconds / (60 * 60))} h`,
  }

  // day
  if (durationInSeconds >= 86400 && durationInSeconds < 172800) return {
    long: `yesterday`,
    short: `1 d`,
  }

  // days
  if (durationInSeconds >= 86400 && durationInSeconds < 172800) return {
    long: `${Math.floor(durationInSeconds / (24 * 60 * 60))} days ago`,
    short: `${Math.floor(durationInSeconds / (24 * 60 * 60))} d`,
  }

  if (durationInSeconds >= 172800 && durationInSeconds < 2592000) return {
    long: `${Math.floor(durationInSeconds / (24 * 60 * 60))} days ago`,
    short: `${Math.floor(durationInSeconds / (24 * 60 * 60))} d`,
  }

  return {
    long: `${format(past * 1000, 'MMMM d, yyyy')}`,
    short: `${format(past * 1000, 'MMM d')}`,
  }
}

