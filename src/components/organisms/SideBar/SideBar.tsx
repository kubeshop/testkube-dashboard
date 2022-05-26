import {useCallback, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

import {Modal} from '@atoms';

import {Tooltip} from '@custom-antd';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {openDiscord, openDocumentation, openGithub} from '@utils/externalLinks';

import {ReactComponent as CogIcon} from '@assets/cog-icon.svg';
import {ReactComponent as DiscordIcon} from '@assets/discord-icon.svg';
import {ReactComponent as DocumentationIcon} from '@assets/documentation-icon.svg';
import {ReactComponent as GitHubIcon} from '@assets/github-icon.svg';
import {ReactComponent as Logo} from '@assets/testkube-symbol-color.svg';

import {testSuitesMenuButtonGradient, testsMenuButtonGradient} from '@styles/gradients';

import {
  StyledLogo,
  StyledNavLink,
  StyledNavigationMenu,
  StyledOther,
  StyledOtherItem,
  StyledSider,
  StyledSiderChildContainer,
} from './SideBar.styled';

const ICON_STYLE = {
  fontSize: 24,
};

const routes = [
  {path: '/dashboard/test-suites', text: 'Test Suites', gradient: testSuitesMenuButtonGradient},
  {path: '/dashboard/tests', text: 'Tests', gradient: testsMenuButtonGradient},
];

const SideBar = () => {
  const [isModalVisible, toggleModal] = useState(false);

  const searchParams = useURLSearchParams();

  const onToggleModal = useCallback(() => {
    toggleModal(prev => !prev);
  }, []);

  useEffect(() => {
    if (!searchParams.apiEndpoint && !localStorage.getItem('apiEndpoint')) {
      toggleModal(true);
    }
  }, []);

  const otherMenuItems = [
    {
      icon: CogIcon,
      onClick: onToggleModal,
      tooltipHint: 'Settings',
    },
    {icon: DocumentationIcon, onClick: openDocumentation, tooltipHint: 'Documentation'},
    {icon: GitHubIcon, onClick: openGithub, tooltipHint: 'GitHub'},
    {icon: DiscordIcon, onClick: openDiscord, tooltipHint: 'Discord'},
  ];

  const renderedMenuItems = routes.map((route: any) => {
    const {text, path, gradient} = route;

    return (
      <StyledNavLink key={path} gradient={gradient} to={path} data-cy="navigation-tab">
        {text}
      </StyledNavLink>
    );
  });

  const renderedOtherMenuItems = otherMenuItems.map(otherMenuItem => {
    const {icon: Icon, onClick, tooltipHint} = otherMenuItem;

    return (
      <Tooltip key={tooltipHint} title={tooltipHint} placement="right">
        <StyledOtherItem onClick={onClick} data-cy={tooltipHint}>
          <Icon style={ICON_STYLE} />
        </StyledOtherItem>
      </Tooltip>
    );
  });

  return (
    <StyledSider width={80} collapsed data-cy="navigation-sider">
      <Modal visible={isModalVisible} isModalVisible={onToggleModal} />
      <StyledSiderChildContainer>
        <StyledNavigationMenu>
          <StyledLogo>
            <NavLink to="/dashboard/test-suites">
              <Logo />
            </NavLink>
          </StyledLogo>
          {renderedMenuItems}
        </StyledNavigationMenu>
        <StyledOther>{renderedOtherMenuItems}</StyledOther>
      </StyledSiderChildContainer>
    </StyledSider>
  );
};

export default SideBar;
