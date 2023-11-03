import {FC, PropsWithChildren} from 'react';

import {renderHook} from '@testing-library/react';

import {PluginScopeMockProvider} from '@testkube/plugins/test';

import {PromoBanner, PromoBannerType} from '@plugins/promo-banners/config';
import {useDisplayedPromoBanner} from '@plugins/promo-banners/hooks/useDisplayedPromoBanner';

const criticalBanner: PromoBanner = {
  id: 'critical-test-id',
  critical: true,
  title: 'test-title',
  description: 'test-description',
  type: PromoBannerType.warning,
  priority: 0,
  position: 'top',
  condition: 'always',
};

const bannerLog: PromoBanner = {
  id: 'regular-test-id',
  title: 'test-title',
  description: 'test-description',
  type: PromoBannerType.warning,
  priority: 0,
  position: 'aboveLogOutput',
  condition: 'always',
};

const banner: PromoBanner = {
  id: 'regular-test-id',
  title: 'test-title',
  description: 'test-description',
  type: PromoBannerType.warning,
  priority: 0,
  position: 'top',
  condition: 'always',
};

const banner2: PromoBanner = {
  id: 'regular-test-id-2',
  title: 'test-title',
  description: 'test-description',
  type: PromoBannerType.warning,
  priority: 0,
  position: 'top',
  condition: 'always',
};

const testFailedBanner: PromoBanner = {
  id: 'regular-test-id',
  title: 'test-title',
  description: 'test-description',
  type: PromoBannerType.warning,
  priority: 0,
  position: 'top',
  condition: 'failedExecution',
};

const createWrapper =
  (
    banners: PromoBanner[] = [],
    {
      closedAt = {},
      close = jest.fn(),
      rotationTime = 10,
      isTestFailed = false,
    }: {
      closedAt?: Record<string, number>;
      close?: (id: string) => void;
      rotationTime?: number;
      isTestFailed?: boolean;
    } = {}
  ): FC<PropsWithChildren<{}>> =>
  ({children}) =>
    (
      <PluginScopeMockProvider
        slots={{banners}}
        data={{
          bannersClose: close,
          bannersRotationTime: rotationTime,
          bannersClosedAt: closedAt,
          bannersIsTestFailed: () => isTestFailed,
        }}
      >
        {children}
      </PluginScopeMockProvider>
    );

describe('plugins.promo-banner', () => {
  describe('useDisplayedPromoBanner', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern');
    });
    afterEach(() => {
      localStorage.removeItem('banners.closedAt');
    });

    it('should close banner', () => {});

    it('should prioritize critical banners', () => {
      const {result} = renderHook(() => useDisplayedPromoBanner('top'), {
        wrapper: createWrapper([banner, criticalBanner]),
      });
      expect(result.current).toBe(criticalBanner);
    });

    it('should not show another banner when shortly ago another regular banner was closed', () => {
      const {result} = renderHook(() => useDisplayedPromoBanner('top'), {
        wrapper: createWrapper([banner, banner2], {
          rotationTime: 1000,
          closedAt: {
            [banner.id]: Date.now() - 999,
          },
        }),
      });
      expect(result.current).toBe(undefined);
    });

    it('should show another banner when rotation time passed', () => {
      const {result} = renderHook(() => useDisplayedPromoBanner('top'), {
        wrapper: createWrapper([banner, banner2], {
          rotationTime: 1000,
          closedAt: {
            [banner.id]: Date.now() - 1000,
          },
        }),
      });
      expect(result.current).toBe(banner2);
    });

    it('should show the oldest banner when rotation time passed and all has been seen', () => {
      const {result} = renderHook(() => useDisplayedPromoBanner('top'), {
        wrapper: createWrapper([banner, banner2], {
          rotationTime: 1000,
          closedAt: {
            [banner.id]: Date.now() - 1000,
            [banner2.id]: Date.now() - 2000,
          },
        }),
      });
      expect(result.current).toBe(banner2);
    });

    it('should show the critical banner even when shortly regular banner was closed', () => {
      const {result} = renderHook(() => useDisplayedPromoBanner('top'), {
        wrapper: createWrapper([banner, criticalBanner], {
          rotationTime: 1000,
          closedAt: {
            [banner.id]: Date.now(),
          },
        }),
      });
      expect(result.current).toBe(criticalBanner);
    });

    it('should match the position', () => {
      const {result} = renderHook(() => useDisplayedPromoBanner('aboveLogOutput'), {
        wrapper: createWrapper([banner, criticalBanner, bannerLog]),
      });
      expect(result.current).toBe(bannerLog);
    });

    describe('Conditions', () => {
      it('should match "failedExecution" condition', () => {
        const {result} = renderHook(() => useDisplayedPromoBanner('top'), {
          wrapper: createWrapper([testFailedBanner], {
            isTestFailed: false,
          }),
        });
        expect(result.current).toBe(undefined);
      });

      it('should not match "failedExecution" condition', () => {
        const {result} = renderHook(() => useDisplayedPromoBanner('top'), {
          wrapper: createWrapper([testFailedBanner], {
            isTestFailed: true,
          }),
        });
        expect(result.current).toBe(testFailedBanner);
      });
    });
  });
});
