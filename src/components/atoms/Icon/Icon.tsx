import React from 'react';

import {HourglassOutlined} from '@ant-design/icons';

import {StyledAntdIcon} from './Icon.styled';
import Icons from './icons';
import {IconProps} from './types';

const {
  CogIcon,
  DocumentationIcon,
  DiscordIcon,
  GitHubIcon,
  PassedStatusIcon,
  FailedStatusIcon,
  RunningStatusIcon,
  PendingStatusIcon,
  DelayIcon,
} = Icons;

import {IconComponentProps} from '@ant-design/icons/lib/components/Icon';

const iconsMap: Record<string, IconComponentProps['component']> = {
  cog: CogIcon,
  documentation: DocumentationIcon,
  discord: DiscordIcon,
  github: GitHubIcon,
  passed: PassedStatusIcon,
  failed: FailedStatusIcon,
  error: FailedStatusIcon,
  running: RunningStatusIcon,
  pending: HourglassOutlined,
  queued: PendingStatusIcon,
  delay: DelayIcon,
  cancelled: FailedStatusIcon,
  timeout: FailedStatusIcon,
  aborted: FailedStatusIcon,
  success: PassedStatusIcon,
};

const Icon: React.FC<IconProps> = props => {
  const {component, name, ...rest} = props;

  const iconComponent = name ? iconsMap[name] : component;

  return <StyledAntdIcon component={iconComponent} {...rest} />;
};

export default Icon;
