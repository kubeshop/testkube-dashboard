import {CSSProperties, FC, useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {useLastCallback} from '@hooks/useLastCallback';

import {MessagePanel} from '@molecules';

import {usePromoBannersPlugin} from '@plugins/promo-banners/hooks';

import {PromoBannerPosition} from '../config';
import {useDisplayedPromoBanner} from '../hooks/useDisplayedPromoBanner';
import {applyUrlParams} from '../utils/applyUrlParams';

export interface PromoBannerProps {
  className?: string;
  style?: CSSProperties;
  position: PromoBannerPosition;
}

export const PromoBanner: FC<PromoBannerProps> = ({position, style, className}) => {
  const navigate = useNavigate();
  const params = useParams();
  const {bannersClose} = usePromoBannersPlugin.pick('bannersClose');
  const close = useLastCallback(() => bannersClose(banner!.id));
  const banner = useDisplayedPromoBanner(position);

  const buttons = useMemo(
    () => [
      ...(banner?.secondaryLink
        ? [
            {
              type: 'secondary' as const,
              text: banner!.secondaryLink.label,
              isLink: true,
              linkConfig: {
                href: applyUrlParams(banner!.secondaryLink.url, params),
                target: banner!.secondaryLink!.target,
              },
              onClick: (event: any) => {
                if (banner!.secondaryLink!.url.startsWith('/') && banner!.secondaryLink!.target === '_top') {
                  event.preventDefault();
                  navigate(applyUrlParams(banner!.secondaryLink!.url, params));
                }
              },
            },
          ]
        : []),
      ...(banner?.primaryLink
        ? [
            {
              type: 'primary' as const,
              text: banner!.primaryLink.label,
              isLink: true,
              linkConfig: {href: applyUrlParams(banner!.primaryLink.url, params), target: banner!.primaryLink!.target},
              onClick: (event: any) => {
                close();
                if (banner!.primaryLink!.url.startsWith('/') && banner!.primaryLink!.target === '_top') {
                  event.preventDefault();
                  navigate(applyUrlParams(banner!.primaryLink!.url, params));
                }
              },
            },
          ]
        : []),
    ],
    [banner?.primaryLink, banner?.secondaryLink, JSON.stringify(params)]
  );

  return banner ? (
    <div style={style} className={className}>
      <MessagePanel
        key={banner.id}
        title={banner.title}
        description={banner.description}
        type={banner.type}
        buttons={buttons}
        onClose={banner.permanent ? undefined : close}
      />
    </div>
  ) : null;
};
