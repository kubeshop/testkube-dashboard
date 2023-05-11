import {formatDuration} from './formatDate';

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const time = (hours = 0, minutes = 0, seconds = 0) => (hours * HOUR + minutes * MINUTE + seconds);

describe('utils', () => {
  describe('formatDuration', () => {
    it('should correctly select between different types of display', () => {
      expect(formatDuration(time(5, 3, 2))).toBe('5h 3m 2s');
      expect(formatDuration(time(0, 3, 2))).toBe('3m 2s');
      expect(formatDuration(time(0, 0, 2))).toBe('2.00s');
    });

    it('should segment values correctly', () => {
      expect(formatDuration(time(1, 0, 0))).toBe('1h 0m 0s');
      expect(formatDuration(time(0, 1, 0))).toBe('1m 0s');
      expect(formatDuration(time(0, 0, 0))).toBe('0.00s');
    });

    it('should round correctly', () => {
      expect(formatDuration(time(1, 59, 59.555))).toBe('1h 59m 59s');
      expect(formatDuration(time(0, 59, 59.555))).toBe('59m 59s');
      expect(formatDuration(time(0, 0, 59.555))).toBe('59.56s');
    });
  });
});
