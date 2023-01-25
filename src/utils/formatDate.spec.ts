import {timeElapsedSince} from './formatDateRefactored'

describe('If the duration of the time is', () => {

  const now = Date.now() / 1000;
  const timeElapsed = timeElapsedSince(now)

  it('less than few seconds', () => {
    expect(timeElapsed(now - 1).long).toEqual('just now')
    expect(timeElapsed(now - 1).short).toEqual('now')
    expect(timeElapsed(now - 9).long).toEqual('just now')
    expect(timeElapsed(now - 9).short).toEqual('now')
  })

  it('less than a minute', () => {
    expect(timeElapsed(now - 30).long).toEqual('a minute ago')
    expect(timeElapsed(now - 30).short).toEqual('1 m')
    expect(timeElapsed(now - 58).long).toEqual('a minute ago')
    expect(timeElapsed(now - 58).short).toEqual('1 m')
  })

  it('exactly 3 minutes ago', () => {
    expect(timeElapsed(now - 60 * 3).long).toEqual('3 minutes ago')
    expect(timeElapsed(now - 60 * 3).short).toEqual('3 m')
  })

  it('exactly 10 minutes ago', () => {
    expect(timeElapsed(now - 60 * 10).long).toEqual('10 minutes ago')
    expect(timeElapsed(now - 60 * 10).short).toEqual('10 m')
  })

  it('exactly 30 minutes', () => {
    expect(timeElapsed(now - 60 * 30).long).toEqual('30 minutes ago')
    expect(timeElapsed(now - 60 * 30).short).toEqual('30 m')
  })

  it('within 55 minutes', () => {
    expect(timeElapsed(now - 60 * 55).long).toEqual('55 minutes ago')
    expect(timeElapsed(now - 60 * 55).short).toEqual('55 m')
  })

  it('exactly 1 hour', () => {
    expect(timeElapsed(now - 60 * 60).long).toEqual('1 hour ago')
    expect(timeElapsed(now - 60 * 60).short).toEqual('1 h')
  })

  it('withing 3 hours ago', () => {
    expect(timeElapsed(now - 60 * 60 * 3).long).toEqual('3 hours ago')
    expect(timeElapsed(now - 60 * 60 * 3).short).toEqual('3 h')
  })

  it('withing 23 hours ago', () => {
    expect(timeElapsed(now - 60 * 60 * 23).long).toEqual('23 hours ago')
    expect(timeElapsed(now - 60 * 60 * 23).short).toEqual('23 h')
  })

  it('withing 26 hours ago', () => {
    expect(timeElapsed(now - 60 * 60 * 26).long).toEqual('yesterday')
    expect(timeElapsed(now - 60 * 60 * 26).short).toEqual('1 d')
  })

  it('withing 29 days', () => {
    expect(timeElapsed(now - 60 * 60 * 24 * 29.5).long).toEqual('29 days ago')
    expect(timeElapsed(now - 60 * 60 * 24 * 29.5).short).toEqual('29 d')
  })

  it('more than a month', () => {
    expect(timeElapsed(now - 3600*24*366).long).toEqual('January 24, 2023')
    expect(timeElapsed(now - 3600*24*366).short).toEqual('Jan 24')
  })
})
