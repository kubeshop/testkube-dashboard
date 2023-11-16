import {useMemo} from 'react';

import {usePluginScope} from '@testkube/plugins';

import {PromoBanner as PromoBannerObject, PromoBannerPosition, conditions} from '../config';
import {usePromoBannersPlugin, usePromoBannersSlot} from '../hooks';

export const useDisplayedPromoBanner = (position: PromoBannerPosition): PromoBannerObject | undefined => {
  const scope = usePluginScope();
  const {bannersClosedAt, bannersRotationTime} = usePromoBannersPlugin.pick('bannersClosedAt', 'bannersRotationTime');
  const lastClosedAt = Object.values(bannersClosedAt).sort().pop() || 0;
  const allBanners = usePromoBannersSlot('banners');
  const matchingBanners = useMemo(
    () => allBanners.filter(x => x.position === position && conditions[x.condition]?.(scope)),
    [allBanners, position]
  );
  const visibleBanners = useMemo(
    () => matchingBanners.filter(x => !bannersClosedAt[x.id]),
    [matchingBanners, bannersClosedAt]
  );
  const highPriorityBanner = useMemo(() => visibleBanners.find(x => x.critical), [visibleBanners]);
  const firstBanner = useMemo(
    () =>
      matchingBanners
        .filter(x => !bannersClosedAt[x.id] || x.recurring)
        .sort((a, b) => (bannersClosedAt[a.id] || 0) - (bannersClosedAt[b.id] || 0))
        .shift(),
    [matchingBanners, bannersClosedAt]
  );

  // [1] Select the high priority banner, if any is not closed
  if (highPriorityBanner) {
    return highPriorityBanner;
  }

  // [2] Don't display any lower priority banner until the rotation time comes
  if (Date.now() < lastClosedAt + bannersRotationTime) {
    return undefined;
  }

  // [3] Display the first banner in the priority order, if any was not displayed yet
  if (visibleBanners.length > 0) {
    return visibleBanners[0];
  }

  // [4] When all banners have been displayed, display the one shown the longest time ago
  return firstBanner;
};
