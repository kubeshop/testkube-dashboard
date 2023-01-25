import {addSeconds, subDays, subHours, subMinutes, subSeconds} from 'date-fns';

import {timeElapsedSince} from './timeElapsedSince';

describe('If the duration of the time is', () => {
  const currentDate = new Date('2023-01-25T11:55:59.238Z');
  const timeElapsed = timeElapsedSince(currentDate);

  it('within the next few seconds', () => {
    expect(timeElapsed(addSeconds(currentDate, 1)).long).toEqual('shortly');
    expect(timeElapsed(addSeconds(currentDate, 1)).short).toEqual('now');
    expect(timeElapsed(addSeconds(currentDate, 9)).long).toEqual('shortly');
    expect(timeElapsed(addSeconds(currentDate, 9)).short).toEqual('now');
  });

  it('less than few seconds', () => {
    expect(timeElapsed(subSeconds(currentDate, 1)).long).toEqual('just now');
    expect(timeElapsed(subSeconds(currentDate, 1)).short).toEqual('now');
    expect(timeElapsed(subSeconds(currentDate, 9)).long).toEqual('just now');
    expect(timeElapsed(subSeconds(currentDate, 9)).short).toEqual('now');
  });

  it('less than a minute', () => {
    expect(timeElapsed(subSeconds(currentDate, 30)).long).toEqual('a minute ago');
    expect(timeElapsed(subSeconds(currentDate, 30)).short).toEqual('1 m');
    expect(timeElapsed(subSeconds(currentDate, 58)).long).toEqual('a minute ago');
    expect(timeElapsed(subSeconds(currentDate, 58)).short).toEqual('1 m');
  });

  it('exactly 3 minutes ago', () => {
    expect(timeElapsed(subMinutes(currentDate, 3)).long).toEqual('3 minutes ago');
    expect(timeElapsed(subMinutes(currentDate, 3)).short).toEqual('3 m');
  });

  it('exactly 10 minutes ago', () => {
    expect(timeElapsed(subMinutes(currentDate, 10)).long).toEqual('10 minutes ago');
    expect(timeElapsed(subMinutes(currentDate, 10)).short).toEqual('10 m');
  });

  it('exactly 30 minutes', () => {
    expect(timeElapsed(subMinutes(currentDate, 30)).long).toEqual('30 minutes ago');
    expect(timeElapsed(subMinutes(currentDate, 30)).short).toEqual('30 m');
  });

  it('within 55 minutes', () => {
    expect(timeElapsed(subMinutes(currentDate, 55)).long).toEqual('55 minutes ago');
    expect(timeElapsed(subMinutes(currentDate, 55)).short).toEqual('55 m');
  });

  it('exactly 1 hour', () => {
    expect(timeElapsed(subMinutes(currentDate, 60)).long).toEqual('1 hour ago');
    expect(timeElapsed(subMinutes(currentDate, 60)).short).toEqual('1 h');
  });

  it('withing 3 hours ago', () => {
    expect(timeElapsed(subHours(currentDate, 3)).long).toEqual('3 hours ago');
    expect(timeElapsed(subHours(currentDate, 3)).short).toEqual('3 h');
  });

  it('withing 23 hours ago', () => {
    expect(timeElapsed(subHours(currentDate, 23)).long).toEqual('23 hours ago');
    expect(timeElapsed(subHours(currentDate, 23)).short).toEqual('23 h');
  });

  it('withing 26 hours ago', () => {
    expect(timeElapsed(subHours(currentDate, 26)).long).toEqual('yesterday');
    expect(timeElapsed(subHours(currentDate, 26)).short).toEqual('1 d');
  });

  it('withing 29 days', () => {
    expect(timeElapsed(subDays(currentDate, 29.5)).long).toEqual('29 days ago');
    expect(timeElapsed(subDays(currentDate, 29.5)).short).toEqual('29 d');
  });

  it('more than a month', () => {
    expect(timeElapsed(subDays(currentDate, 366)).long).toEqual('January 24, 2022');
    expect(timeElapsed(subDays(currentDate, 366)).short).toEqual('Jan 24');
  });
});
