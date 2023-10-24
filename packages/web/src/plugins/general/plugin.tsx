import React, {FC, ReactNode} from 'react';
import {Navigate} from 'react-router-dom';

import {createPlugin, slot} from '@testkube/plugins';

import {IconProps} from '@atoms/Icon/types';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {MessagePanelProps} from '@molecules/MessagePanel/MessagePanel';

import {EndpointProcessing} from '@pages';

import {isApiEndpointLocked, useApiEndpoint} from '@services/apiEndpoint';

export default createPlugin('dashboard/general')
  .data({useDashboardNavigate})
  .data({useApiEndpoint})

  .route('/apiEndpoint', tk => (isApiEndpointLocked() ? <Navigate to="/" replace /> : <EndpointProcessing />))

  .define(slot<ReactNode>()('siderLogo'))

  .define(slot<{key: string} & Omit<MessagePanelProps, 'onClose'>>()('banners'))

  .define(
    slot<{
      path: string;
      icon: FC<{style: any}>;
      title: string;
      additionalClassName?: string;
      active?: RegExp;
    }>()('siderItems')
  )
  .define(
    slot<{
      icon: IconProps['name'];
      title?: string;
      size?: number;
      onClick?: () => void;
      dropdownComponent?: ReactNode;
      active?: RegExp;
    }>()('siderOtherItems')
  )
  .route('/', tk => <Navigate to={tk.slots.siderItems.first()?.path || '/tests'} replace />)

  .init();
