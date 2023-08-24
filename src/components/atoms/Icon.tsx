import {FC} from 'react';

import {HourglassOutlined} from '@ant-design/icons';
import {IconComponentProps} from '@ant-design/icons/lib/components/Icon';

import {StyledAntdIcon} from './Icon.styled';
import {icons as Icons} from './Icon/icons';
import type {IconProps} from './Icon/types';

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
  pending: HourglassOutlined as FC<{}>,
  queued: PendingStatusIcon,
  delay: DelayIcon,
  cancelled: FailedStatusIcon,
  timeout: FailedStatusIcon,
  aborted: FailedStatusIcon,
  aborting: AbortingStatusIcon,
  success: PassedStatusIcon,
  cloudMigrate: CloudMigrateIcon,
};

export const Icon: FC<IconProps> = props => {
  const {component, name, ...rest} = props;

  const iconComponent = name ? iconsMap[name] : component;

  return <StyledAntdIcon component={iconComponent} {...rest} />;
};
