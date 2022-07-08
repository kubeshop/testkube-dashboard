import React from 'react';

import AntdIcon from '@ant-design/icons';

import Icons from './icons';

const {CogIcon, DocumentationIcon, DiscordIcon, GitHubIcon} = Icons;

const iconsMap: any = {
  cog: CogIcon,
  documentation: DocumentationIcon,
  discord: DiscordIcon,
  github: GitHubIcon,
};

type IconProps = {
  name: 'cog' | 'documentation' | 'discord' | 'github';
  component: any;
};

const Icon: React.FC<IconProps> = props => {
  const {component, name} = props;

  const iconComponent = name ? iconsMap[name] : component;

  return <AntdIcon component={iconComponent} />;
};

export default Icon;
