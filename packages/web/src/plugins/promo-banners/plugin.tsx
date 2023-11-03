import {useMemo} from 'react';
import {useEvent} from 'react-use';

import {config, createPlugin, data, external, slot} from '@testkube/plugins';

import {Execution} from '@models/execution';

import type GeneralPlugin from '@plugins/general/plugin';
import type TestsPlugin from '@plugins/tests-and-test-suites/plugin';

import {PromoBanner as PromoBannerElement} from './components/PromoBanner';
import {PromoBanner} from './config';

const generalStub = external<typeof GeneralPlugin>();
const testsStub = external<typeof TestsPlugin>();

// Storage configuration
const bannersClosedAtKey = 'banners.closedAt';

// TODO: Move it as a global helper
// TODO: Prepare utilities for the localStorage access
// Handle Safari in private mode
const hasLocalStorage = (() => {
  try {
    localStorage.setItem('$$dummy', '$$value');
    return localStorage.getItem('$$dummy') === '$$value';
  } catch (error) {
    return false;
  }
})();

export default createPlugin('oss/promo-banners')
  .define(config<number>()('rotationTime'))
  .needs(generalStub.slots('contentTop'))
  .needs(testsStub.slots('logOutputTop'))
  .needs(testsStub.data('useExecutionDetails', 'useEntityDetails'))

  .define(slot<PromoBanner>()('banners'))

  .define(data<Record<string, number>>()('bannersClosedAt'))
  .define(data<number>()('bannersRotationTime'))
  .define(data<(id: string) => void>()('bannersClose'))

  // Watch for banners from external source
  .provider(({scope}) => {
    useEvent('display-banner', ({data: banner}) => {
      scope.slots.banners.add(banner, {
        order: -1 * banner.priority + (banner.critical ? -1e9 : 0),
      });
    });
  })

  // Persist state in the local storage
  .provider(({useData}) => {
    const {bannersClosedAt} = useData.pick('bannersClosedAt');
    useMemo(() => {
      if (hasLocalStorage) {
        localStorage.setItem(bannersClosedAtKey, JSON.stringify(bannersClosedAt));
      }
    }, [bannersClosedAt]);
  })

  .define(data<() => boolean>()('bannersIsTestFailed'))

  .init((tk, cfg) => {
    // Load current state from the local storage
    if (hasLocalStorage) {
      tk.data.bannersClosedAt = JSON.parse(localStorage.getItem(bannersClosedAtKey) || '{}');
    } else {
      tk.data.bannersClosedAt = {};
    }

    // Prepare helper for getting information about current test execution status
    tk.data.bannersIsTestFailed = tk.sync(
      () => tk.data.useExecutionDetails(x => x.data as Execution)?.executionResult?.status === 'failed',
      false
    );

    // Prepare helper for closing the banner
    tk.data.bannersClose = id => {
      tk.data.bannersClosedAt = {
        ...tk.data.bannersClosedAt,
        [id]: Date.now(),
      };
    };

    // Push information about rotation time
    tk.data.bannersRotationTime = cfg.rotationTime;

    // Inject to expected places
    tk.slots.contentTop.add(<PromoBannerElement position="top" style={{marginTop: 30, marginRight: 30}} />, {
      order: -1000,
    });
    tk.slots.logOutputTop.add(<PromoBannerElement position="aboveLogOutput" style={{marginBottom: 30}} />, {
      order: -1000,
    });
  });
