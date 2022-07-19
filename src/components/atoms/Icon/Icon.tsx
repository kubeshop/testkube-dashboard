import React from 'react';

import AntdIcon from '@ant-design/icons';

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
} = Icons;

const iconsMap: any = {
  cog: CogIcon,
  documentation: DocumentationIcon,
  discord: DiscordIcon,
  github: GitHubIcon,
  passed: PassedStatusIcon,
  failed: FailedStatusIcon,
  running: RunningStatusIcon,
  pending: PendingStatusIcon,
};

type IconProps = {
  name: 'cog' | 'documentation' | 'discord' | 'github' | 'passed' | 'failed' | 'running' | 'pending';
  component?: any;
};

const Icon: React.FC<IconProps> = props => {
  const {component, name, ...rest} = props;

  const iconComponent = name ? iconsMap[name] : component;

  return <AntdIcon component={iconComponent} {...rest} />;
};

export default Icon;
