import {render, renderHook} from '@testing-library/react';

import {usePluginSystem} from '@testkube/plugins';
import {createPluginScopeMock} from '@testkube/plugins/test';

import {Execution} from '@models/execution';

import {PromoBanner} from '@plugins/promo-banners/config';

import PromoBannerPlugin from './plugin';

const renderSystem = ({
  rotationTime = 10,
  execution = null,
}: {rotationTime?: number; execution?: Partial<Execution> | null} = {}) => {
  const parent = createPluginScopeMock({
    data: {
      useExecutionDetails: () => ({data: null}),
    },
    slots: {contentTop: [], logOutputTop: []},
  });
  return renderHook(() => usePluginSystem([PromoBannerPlugin.configure({rotationTime})], parent)).result.current;
};

describe('plugins.promo-banners', () => {
  describe('Plugin', () => {
    afterEach(() => {
      jest.useFakeTimers('modern');
      localStorage.removeItem('banners.closedAt');
    });

    it('should listen for the "display-banner" event', () => {
      const [Provider, {scope}] = renderSystem();
      const banner: PromoBanner = {
        id: 'test-id',
      } as any;

      render(<Provider />);

      const event = new Event('display-banner');
      // @ts-ignore:
      event.data = banner;
      window.dispatchEvent(event);
      expect(scope.slots.banners.all()).toEqual([banner]);
    });

    it('should expose the rotation time', () => {
      const [, {scope}] = renderSystem({rotationTime: 123451});
      expect(scope.data.bannersRotationTime).toBe(123451);
    });

    it('should read initial state from the local storage', () => {
      localStorage.setItem('banners.closedAt', '{"abc": 123}');
      const [, {scope}] = renderSystem();
      expect(scope.data.bannersClosedAt).toEqual({abc: 123});
    });

    it('should persist the state in the local storage', () => {
      localStorage.setItem('banners.closedAt', '{"abc": 123}');
      const [, {scope}] = renderSystem();
      scope.data.bannersClose('xyz');
      expect(JSON.parse(localStorage.getItem('banners.closedAt')!)).toEqual({abc: 123, xyz: Date.now()});
    });
  });
});
