import {useEffect, useMemo, useState} from 'react';
import {NavLink} from 'react-router-dom';

import {Space} from 'antd';

import {Icon} from '@atoms';

import {EndpointModal} from '@molecules';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {openDiscord, openDocumentation, openGithub} from '@utils/externalLinks';

import {ReactComponent as TestSuitesIcon} from '@assets/test-suites-icon.svg';
import {ReactComponent as Logo} from '@assets/testkube-symbol-color.svg';
import {ReactComponent as TestsIcon} from '@assets/tests-icon.svg';

import {
  StyledLogo,
  StyledNavLink,
  StyledNavigationMenu,
  StyledOther,
  StyledOtherItem,
  StyledSider,
  StyledSiderChildContainer,
} from './Sider.styled';

const DEFAULT_ICON_STYLE = {
  fontSize: 24,
};

const routes = [
  {
    path: 'tests',
    icon: TestsIcon,
    transition: {
      classNames: 'item2',
    },
  },
  {
    path: 'test-suites',
    icon: TestSuitesIcon,
    transition: {
      classNames: 'item',
    },
  },
];

const Sider: React.FC = () => {
  const [isModalVisible, toggleModal] = useState(false);

  const searchParams = useURLSearchParams();

  const onToggleModal = () => {
    toggleModal(prev => !prev);
  };

  useEffect(() => {
    if (!searchParams.apiEndpoint && !localStorage.getItem('apiEndpoint')) {
      toggleModal(true);
    }
  }, []);

  const otherMenuItems = [
    {
      icon: 'cog',
      onClick: onToggleModal,
    },
    {icon: 'github', onClick: openGithub},
    {icon: 'documentation', onClick: openDocumentation},
    {icon: 'discord', onClick: openDiscord},
  ];

  const renderedMenuItems = useMemo(() => {
    return routes.map((route: any) => {
      const {icon: MenuIcon, path} = route;

      return (
        <StyledNavLink
          key={path}
          to={{
            pathname: path,
          }}
          data-cy="navigation-tab"
        >
          <MenuIcon style={DEFAULT_ICON_STYLE} />
        </StyledNavLink>
      );
    });
  }, []);

  const renderedOtherMenuItems = useMemo(() => {
    return otherMenuItems.map(otherMenuItem => {
      const {icon, onClick} = otherMenuItem;

      return (
        <StyledOtherItem key={icon}>
          {/* @ts-ignore */}
          <Icon name={icon} onClick={onClick} />
        </StyledOtherItem>
      );
    });
  }, []);

  return (
    <StyledSider width={100} data-cy="navigation-sider">
      <EndpointModal visible={isModalVisible} isModalVisible={onToggleModal} />
      <StyledSiderChildContainer>
        <StyledNavigationMenu>
          <Space size={30} direction="vertical">
            <StyledLogo>
              <NavLink to="/tests">
                <Logo />
              </NavLink>
            </StyledLogo>
            {renderedMenuItems}
          </Space>
        </StyledNavigationMenu>
        <StyledOther size={20} direction="vertical">
          {renderedOtherMenuItems}
        </StyledOther>
      </StyledSiderChildContainer>
    </StyledSider>
  );
};

export default Sider;
