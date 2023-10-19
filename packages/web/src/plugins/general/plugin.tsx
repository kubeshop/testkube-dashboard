import React, {FC, ReactNode} from 'react';
import {Navigate} from 'react-router-dom';

import {createPlugin, slot} from '@testkube/plugins';

import {IconProps} from '@atoms/Icon/types';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {MessagePanelProps} from '@molecules/MessagePanel/MessagePanel';

import {EndpointProcessing} from '@pages';

import {useApiEndpoint} from '@services/apiEndpoint';

export default createPlugin('oss/general')
  .data({useDashboardNavigate})
  .data({useApiEndpoint})

  // TODO: Allow passing function to base on scope
  //       isApiEndpointLocked() ? <Navigate to="/" replace /> : <EndpointProcessing />
  .route('/apiEndpoint', <EndpointProcessing />)

  // TODO: Use first route from the sider instead
  .route('/', <Navigate to="/tests" replace />)

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
  .init();
