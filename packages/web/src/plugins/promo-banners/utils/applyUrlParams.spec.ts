import {applyUrlParams} from './applyUrlParams';

describe('plugins.promo-banners', () => {
  describe('applyUrlParams', () => {
    it('should apply params correctly', () => {
      expect(applyUrlParams('/some/url/{id}/with/{another}', {id: 'another', another: 'something-else'})).toBe(
        '/some/url/another/with/something-else'
      );
    });

    it('should URL-encode params', () => {
      expect(applyUrlParams('/some/url/{id}', {id: 'another/param'})).toBe('/some/url/another%2Fparam');
    });
  });
});
