import {hasProtocol} from './strings';

describe('strings', () => {
  describe('hasProtocol', () => {
    it('should return true if the url has a protocol', () => {
      expect(hasProtocol('https://www.google.com')).toBe(true);
      expect(hasProtocol('http://www.google.com')).toBe(true);
    });

    it('should return false if the url does not have a protocol', () => {
      expect(hasProtocol('www.google.com')).toBe(false);
      expect(hasProtocol('google.com')).toBe(false);
    });
  });
});
