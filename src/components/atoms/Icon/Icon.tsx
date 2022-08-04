import React from 'react';

import {StyledAntdIcon} from './Icon.styled';
import Icons from './icons';

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

const iconsMap: any = {
  cog: CogIcon,
  documentation: DocumentationIcon,
  discord: DiscordIcon,
  github: GitHubIcon,
  passed: PassedStatusIcon,
  failed: FailedStatusIcon,
  error: FailedStatusIcon,
  running: RunningStatusIcon,
  pending: PendingStatusIcon,
  queued: PendingStatusIcon,
  delay: DelayIcon,
};

type IconProps = {
  name: 'cog' | 'documentation' | 'discord' | 'github' | 'passed' | 'failed' | 'running' | 'pending' | 'delay';
  component?: any;
  style?: any;
};

const Icon: React.FC<IconProps> = props => {
  const {component, name, ...rest} = props;

  const iconComponent = name ? iconsMap[name] : component;

  return <StyledAntdIcon component={iconComponent} {...rest} />;
};

export default Icon;
