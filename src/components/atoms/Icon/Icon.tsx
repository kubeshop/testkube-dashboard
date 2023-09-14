import React from 'react';

import {HourglassOutlined} from '@ant-design/icons';
import {IconComponentProps} from '@ant-design/icons/lib/components/Icon';

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
  AbortingStatusIcon,
  CloudMigrateIcon,
  StatusPageIcon,
} = Icons;

const iconsMap: Record<IconProps['name'], IconComponentProps['component']> = {
  cog: CogIcon,
  documentation: DocumentationIcon,
  discord: DiscordIcon,
  github: GitHubIcon,
  passed: PassedStatusIcon,
  failed: FailedStatusIcon,
  error: FailedStatusIcon,
  running: RunningStatusIcon,
  // It's standalone AntD icon that shouldn't be used, but it works
  pending: HourglassOutlined as React.FC<{}>,
  queued: PendingStatusIcon,
  delay: DelayIcon,
  cancelled: FailedStatusIcon,
  timeout: FailedStatusIcon,
  aborted: FailedStatusIcon,
  aborting: AbortingStatusIcon,
  success: PassedStatusIcon,
  cloudMigrate: CloudMigrateIcon,
  statusPage: StatusPageIcon,
  operational: PassedStatusIcon,
  major_outage: FailedStatusIcon,
  partial_outage: FailedStatusIcon,
  unknown: FailedStatusIcon,
};

const Icon: React.FC<IconProps> = props => {
  const {component, name, ...rest} = props;

  const iconComponent = name ? iconsMap[name] : component;

  return <StyledAntdIcon component={iconComponent} {...rest} />;
};

export default Icon;
