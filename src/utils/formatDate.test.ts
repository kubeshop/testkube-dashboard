import {timeStampToDate} from './formatDate';

describe('formatDate tests', () => {
  describe('timeStampToDate tests', () => {
    test('timeStampToDate returns an empty string if no timeStamp was provided', () => {
      expect(timeStampToDate('')).toStrictEqual('');
    });
  });
});
