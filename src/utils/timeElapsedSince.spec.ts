import {timeElapsedSince} from './timeElapsedSince'

describe('If the duration of the time is', () => {

  const currentDate = Date.parse('January 24, 2023') / 1000;
  const timeElapsed = timeElapsedSince(currentDate)

  it('within the next few seconds', () => {
    expect(timeElapsed(currentDate + 1).long).toEqual('shortly')
    expect(timeElapsed(currentDate + 1).short).toEqual('now')
    expect(timeElapsed(currentDate + 9).long).toEqual('shortly')
    expect(timeElapsed(currentDate + 9).short).toEqual('now')
  })

  it('less than few seconds', () => {
    expect(timeElapsed(currentDate - 1).long).toEqual('just now')
    expect(timeElapsed(currentDate - 1).short).toEqual('now')
    expect(timeElapsed(currentDate - 9).long).toEqual('just now')
    expect(timeElapsed(currentDate - 9).short).toEqual('now')
  })

  it('less than a minute', () => {
    expect(timeElapsed(currentDate - 30).long).toEqual('a minute ago')
    expect(timeElapsed(currentDate - 30).short).toEqual('1 m')
    expect(timeElapsed(currentDate - 58).long).toEqual('a minute ago')
    expect(timeElapsed(currentDate - 58).short).toEqual('1 m')
  })

  it('exactly 3 minutes ago', () => {
    expect(timeElapsed(currentDate - 60 * 3).long).toEqual('3 minutes ago')
    expect(timeElapsed(currentDate - 60 * 3).short).toEqual('3 m')
  })

  it('exactly 10 minutes ago', () => {
    expect(timeElapsed(currentDate - 60 * 10).long).toEqual('10 minutes ago')
    expect(timeElapsed(currentDate - 60 * 10).short).toEqual('10 m')
  })

  it('exactly 30 minutes', () => {
    expect(timeElapsed(currentDate - 60 * 30).long).toEqual('30 minutes ago')
    expect(timeElapsed(currentDate - 60 * 30).short).toEqual('30 m')
  })

  it('within 55 minutes', () => {
    expect(timeElapsed(currentDate - 60 * 55).long).toEqual('55 minutes ago')
    expect(timeElapsed(currentDate - 60 * 55).short).toEqual('55 m')
  })

  it('exactly 1 hour', () => {
    expect(timeElapsed(currentDate - 60 * 60).long).toEqual('1 hour ago')
    expect(timeElapsed(currentDate - 60 * 60).short).toEqual('1 h')
  })

  it('withing 3 hours ago', () => {
    expect(timeElapsed(currentDate - 60 * 60 * 3).long).toEqual('3 hours ago')
    expect(timeElapsed(currentDate - 60 * 60 * 3).short).toEqual('3 h')
  })

  it('withing 23 hours ago', () => {
    expect(timeElapsed(currentDate - 60 * 60 * 23).long).toEqual('23 hours ago')
    expect(timeElapsed(currentDate - 60 * 60 * 23).short).toEqual('23 h')
  })

  it('withing 26 hours ago', () => {
    expect(timeElapsed(currentDate - 60 * 60 * 26).long).toEqual('yesterday')
    expect(timeElapsed(currentDate - 60 * 60 * 26).short).toEqual('1 d')
  })

  it('withing 29 days', () => {
    expect(timeElapsed(currentDate - 60 * 60 * 24 * 29.5).long).toEqual('29 days ago')
    expect(timeElapsed(currentDate - 60 * 60 * 24 * 29.5).short).toEqual('29 d')
  })

  it('more than a month', () => {
    expect(timeElapsed(currentDate - 3600*24*365).long).toEqual('January 24, 2022')
    expect(timeElapsed(currentDate - 3600*24*365).short).toEqual('Jan 24')
  })
})
