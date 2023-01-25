import {format} from 'date-fns'

import {executionDateFormat} from './strings'

export const formatExecutionDate = (date: Date, formatString = executionDateFormat) => {
  return format(date, formatString)
}

interface TimeFormat {
  short: string;
  long: string;
  fullTime: number;
}

export const timeElapsedSince = (currentTime: number) => (timeOfTheEvent: number): TimeFormat => {

  const durationInSeconds = currentTime - timeOfTheEvent

  // within the last few seconds
  if (durationInSeconds >= 0 && durationInSeconds < 10) return {
    long: 'just now',
    short: 'now',
    fullTime: durationInSeconds
  }

  // within the last minute
  if (durationInSeconds >= 10 && durationInSeconds < 60) return {
    long: 'a minute ago',
    short: '1 m',
    fullTime: durationInSeconds
  }

  // within 59 minutes
  if (durationInSeconds >= 60 && durationInSeconds < 3600) return {
    long: `${Math.floor(durationInSeconds / 60)} minutes ago`,
    short: `${Math.floor(durationInSeconds / 60)} m`,
    fullTime: durationInSeconds
  }

  // 1 hour
  if (durationInSeconds >= 3600 && durationInSeconds < 7200) return {
    long: `1 hour ago`,
    short: `1 h`,
    fullTime: durationInSeconds
  }

  // hours
  if (durationInSeconds >= 7200 && durationInSeconds < 86400) return {
    long: `${Math.floor(durationInSeconds / (60 * 60))} hours ago`,
    short: `${Math.floor(durationInSeconds / (60 * 60))} h`,
    fullTime: durationInSeconds
  }

  // day
  if (durationInSeconds >= 86400 && durationInSeconds < 172800) return {
    long: `yesterday`,
    short: `1 d`,
    fullTime: durationInSeconds
  }

  // days
  if (durationInSeconds >= 86400 && durationInSeconds < 172800) return {
    long: `${Math.floor(durationInSeconds / (24 * 60 * 60))} days ago`,
    short: `${Math.floor(durationInSeconds / (24 * 60 * 60))} d`,
    fullTime: durationInSeconds
  }

  if (durationInSeconds >= 172800 && durationInSeconds < 2592000) return {
    long: `${Math.floor(durationInSeconds / (24 * 60 * 60))} days ago`,
    short: `${Math.floor(durationInSeconds / (24 * 60 * 60))} d`,
    fullTime: durationInSeconds
  }

  return {
    long: `${format(timeOfTheEvent*1000, 'MMMM d, yyyy')}`,
    short: `${format(timeOfTheEvent*1000, 'MMM d')}`,
    fullTime: durationInSeconds
  }
}

