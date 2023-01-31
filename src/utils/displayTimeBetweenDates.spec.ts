import {addSeconds, subDays, subHours, subMinutes, subSeconds} from 'date-fns';

import {displayTimeBetweenDates} from './displayTimeBetweenDates';

const currentDate = new Date('2023-01-25T11:55:59.238Z');
const displayTimeFromCurrentDate = date => displayTimeBetweenDates(currentDate, date);

describe('If the duration of the time is', () => {
  it('within the next few seconds', () => {
    expect(displayTimeFromCurrentDate(addSeconds(currentDate, 1)).long).toEqual('shortly');
    expect(displayTimeFromCurrentDate(addSeconds(currentDate, 1)).short).toEqual('now');
    expect(displayTimeFromCurrentDate(addSeconds(currentDate, 9)).long).toEqual('shortly');
    expect(displayTimeFromCurrentDate(addSeconds(currentDate, 9)).short).toEqual('now');
  });

  it('less than few seconds', () => {
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 0)).long).toEqual('just now');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 0)).short).toEqual('now');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 1)).long).toEqual('just now');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 1)).short).toEqual('now');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 9)).long).toEqual('just now');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 9)).short).toEqual('now');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 19)).long).toEqual('just now');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 19)).short).toEqual('now');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 29)).long).toEqual('just now');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 29)).short).toEqual('now');
  });

  it('around the minute', () => {
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 30)).long).toEqual('a minute ago');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 30)).short).toEqual('1 m');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 58)).long).toEqual('a minute ago');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 58)).short).toEqual('1 m');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 65)).long).toEqual('a minute ago');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 65)).short).toEqual('1 m');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 89)).long).toEqual('a minute ago');
    expect(displayTimeFromCurrentDate(subSeconds(currentDate, 89)).short).toEqual('1 m');
  });

  it('exactly 3 minutes ago', () => {
    expect(displayTimeFromCurrentDate(subMinutes(currentDate, 3)).long).toEqual('3 minutes ago');
    expect(displayTimeFromCurrentDate(subMinutes(currentDate, 3)).short).toEqual('3 m');
  });

  it('exactly 10 minutes ago', () => {
    expect(displayTimeFromCurrentDate(subMinutes(currentDate, 10)).long).toEqual('10 minutes ago');
    expect(displayTimeFromCurrentDate(subMinutes(currentDate, 10)).short).toEqual('10 m');
  });

  it('exactly 30 minutes', () => {
    expect(displayTimeFromCurrentDate(subMinutes(currentDate, 30)).long).toEqual('30 minutes ago');
    expect(displayTimeFromCurrentDate(subMinutes(currentDate, 30)).short).toEqual('30 m');
  });

  it('within 55 minutes', () => {
    expect(displayTimeFromCurrentDate(subMinutes(currentDate, 55)).long).toEqual('55 minutes ago');
    expect(displayTimeFromCurrentDate(subMinutes(currentDate, 55)).short).toEqual('55 m');
  });

  it('exactly 1 hour', () => {
    expect(displayTimeFromCurrentDate(subMinutes(currentDate, 60)).long).toEqual('1 hour ago');
    expect(displayTimeFromCurrentDate(subMinutes(currentDate, 60)).short).toEqual('1 h');
  });

  it('withing 3 hours ago', () => {
    expect(displayTimeFromCurrentDate(subHours(currentDate, 3)).long).toEqual('3 hours ago');
    expect(displayTimeFromCurrentDate(subHours(currentDate, 3)).short).toEqual('3 h');
  });

  it('withing 23 hours ago', () => {
    expect(displayTimeFromCurrentDate(subHours(currentDate, 23)).long).toEqual('23 hours ago');
    expect(displayTimeFromCurrentDate(subHours(currentDate, 23)).short).toEqual('23 h');
  });

  it('withing 26 hours ago', () => {
    expect(displayTimeFromCurrentDate(subHours(currentDate, 26)).long).toEqual('yesterday');
    expect(displayTimeFromCurrentDate(subHours(currentDate, 26)).short).toEqual('1 d');
  });

  it('withing 29 days', () => {
    expect(displayTimeFromCurrentDate(subDays(currentDate, 29.5)).long).toEqual('29 days ago');
    expect(displayTimeFromCurrentDate(subDays(currentDate, 29.5)).short).toEqual('29 d');
  });

  it('more than a month', () => {
    expect(displayTimeFromCurrentDate(subDays(currentDate, 366)).long).toEqual('January 24, 2022');
    expect(displayTimeFromCurrentDate(subDays(currentDate, 366)).short).toEqual('Jan 24');
  });
});
