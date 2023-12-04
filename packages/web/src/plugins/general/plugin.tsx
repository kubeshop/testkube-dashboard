import React, {FC, ReactNode} from 'react';
import {Navigate} from 'react-router-dom';

import {config, createPlugin, data, external, slot} from '@testkube/plugins';

import {IconProps} from '@atoms/Icon/types';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {EndpointProcessing} from '@pages';

import type PermissionsStub from '@plugins/permissions/plugin';

import {isApiEndpointLocked, useApiEndpoint} from '@services/apiEndpoint';

const permissionsStub = external<typeof PermissionsStub>();

export default createPlugin('dashboard/general')
  .needs(permissionsStub.data('permissionsScope'))

  .data({useDashboardNavigate})
  .data({useApiEndpoint})

  .route('/apiEndpoint', tk => (isApiEndpointLocked() ? <Navigate to="/" replace /> : <EndpointProcessing />))

  .define(config<Boolean>()('preventDefaultRedirect', false))
  .define(slot<ReactNode>()('siderLogo'))
  .define(slot<ReactNode>()('contentTop'))

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
  .define(data<Boolean>()('preventDefaultRedirect'))
  .route('/', tk =>
    !tk.data.preventDefaultRedirect ? (
      <Navigate to={tk.slots.siderItems.first()?.path || '/tests'} replace />
    ) : (
      <Navigate to="/" />
    )
  )

  .init((tk, cfg) => {
    tk.data.preventDefaultRedirect = cfg.preventDefaultRedirect;
  });
