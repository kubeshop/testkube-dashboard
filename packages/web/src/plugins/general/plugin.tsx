import {FC, ReactNode} from 'react';

import {createPlugin, slot} from '@testkube/plugins';

import {IconProps} from '@atoms/Icon/types';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {useApiEndpoint} from '@services/apiEndpoint';

export default createPlugin('oss/general')
  .data({useDashboardNavigate})
  .data({useApiEndpoint})
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
    }>()('siderOtherItems')
  )
  .init();
