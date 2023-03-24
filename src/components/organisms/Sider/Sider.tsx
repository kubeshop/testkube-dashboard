import {useContext, useMemo, useState} from 'react';
import {NavLink} from 'react-router-dom';

import {Space, Tooltip} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput} from '@redux/reducers/configSlice';

import {Icon} from '@atoms';

import {EndpointModal} from '@molecules';

import {openDiscord, openDocumentation, openGithub} from '@utils/externalLinks';

import {ReactComponent as ExecutorsIcon} from '@assets/executor.svg';
import {ReactComponent as SourcesIcon} from '@assets/sources.svg';
import {ReactComponent as TestSuitesIcon} from '@assets/test-suites-icon.svg';
import {ReactComponent as Logo} from '@assets/testkube-symbol-color.svg';
import {ReactComponent as TestsIcon} from '@assets/tests-icon.svg';
import {ReactComponent as TriggersIcon} from '@assets/triggers.svg';

import {MainContext} from '@contexts';

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
    title: 'Tests',
    transition: {
      classNames: 'item2',
    },
  },
  {
    path: 'test-suites',
    icon: TestSuitesIcon,
    title: 'Test Suites',
    transition: {
      classNames: 'item',
    },
  },
  {
    path: 'executors',
    icon: ExecutorsIcon,
    title: 'Executors',
    transition: {
      classNames: 'item',
    },
  },
  {
    path: 'triggers',
    icon: TriggersIcon,
    title: 'Triggers',
    transition: {
      classNames: 'item',
    },
  },
  {
    path: 'sources',
    icon: SourcesIcon,
    title: 'Sources',
    transition: {
      classNames: 'item',
    },
  },
];

const Sider: React.FC = () => {
  const [isModalVisible, setModalState] = useState(false);
  const {navigate} = useContext(MainContext);

  const {isFullScreenLogOutput} = useAppSelector(selectFullScreenLogOutput);

  const otherMenuItems = [
    {
      icon: 'cog',
      onClick: () => navigate('/settings'),
    },
    {icon: 'github', onClick: openGithub},
    {icon: 'documentation', onClick: openDocumentation},
    {icon: 'discord', onClick: openDiscord},
  ];

  const renderedMenuItems = useMemo(() => {
    return routes.map((route: any) => {
      const {icon: MenuIcon, path, title} = route;

      return (
        <StyledNavLink
          key={path}
          to={{
            pathname: path,
          }}
          data-cy="navigation-tab"
        >
          <Tooltip title={title} placement="right">
            <MenuIcon style={DEFAULT_ICON_STYLE} />
          </Tooltip>
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
    <StyledSider width={100} data-cy="navigation-sider" isFullScreenLogOutput={isFullScreenLogOutput}>
      <EndpointModal visible={isModalVisible} setModalState={setModalState} />
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
