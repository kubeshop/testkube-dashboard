import {useMemo, useContext} from 'react';

import {Space, Tooltip} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput} from '@redux/reducers/configSlice';

import {Icon} from '@atoms';

import {openDiscord, openDocumentation, openGithub} from '@utils/externalLinks';

import {ReactComponent as ExecutorsIcon} from '@assets/executor.svg';
import {ReactComponent as SourcesIcon} from '@assets/sources.svg';
import {ReactComponent as TestSuitesIcon} from '@assets/test-suites-icon.svg';
import {ReactComponent as Logo} from '@assets/testkube-symbol-color.svg';
import {ReactComponent as TestsIcon} from '@assets/tests-icon.svg';
import {ReactComponent as TriggersIcon} from '@assets/triggers.svg';

import {ReactComponent as SettingIcon} from '@icons/setting.svg';

import {DashboardContext} from '@contexts';

import SiderLink from './SiderLink';
import {
  StyledLogo,
  StyledNavigationMenu,
  StyledOther,
  StyledOtherItem,
  StyledSider,
  StyledSiderChildContainer,
  StyledSiderLink,
} from './Sider.styled';

const DEFAULT_ICON_STYLE = {
  fontSize: 24,
};

const getRoutes = (showSocialLinksInSider: boolean) => [
  {
    path: '/tests',
    icon: TestsIcon,
    title: 'Tests',
    transition: {
      classNames: 'item2',
    },
  },
  {
    path: '/test-suites',
    icon: TestSuitesIcon,
    title: 'Test Suites',
    transition: {
      classNames: 'item',
    },
  },
  {
    path: '/executors',
    icon: ExecutorsIcon,
    title: 'Executors',
    transition: {
      classNames: 'item',
    },
  },
  {
    path: '/triggers',
    icon: TriggersIcon,
    title: 'Triggers',
    transition: {
      classNames: 'item',
    },
  },
  {
    path: '/sources',
    icon: SourcesIcon,
    title: 'Sources',
    transition: {
      classNames: 'item',
    },
  },
    ...(showSocialLinksInSider ? [] : [
      {
        path: '/settings',
        icon: SettingIcon,
        title: 'Settings',
        transition: {
          classNames: 'item',
        },
        additionalClassName: 'settings-icon',
        active: /environment-management/,
      }
    ]),
];

const Sider: React.FC = () => {
  const {navigate, showLogoInSider, showSocialLinksInSider} = useContext(DashboardContext);

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
    return getRoutes(showSocialLinksInSider).map(route => {
      const {icon: MenuIcon, path, title, active} = route;

      return (
        <StyledSiderLink
          key={path}
          href={path}
          data-cy="navigation-tab"
          className={route.additionalClassName}
          active={active}
        >
          <Tooltip title={title} placement="right">
            <span><MenuIcon style={DEFAULT_ICON_STYLE} /></span>
          </Tooltip>
        </StyledSiderLink>
      );
    });
  }, [showSocialLinksInSider]);

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
    <StyledSider width={100} data-cy="navigation-sider" $isFullScreenLogOutput={isFullScreenLogOutput}>
      <StyledSiderChildContainer>
        <StyledNavigationMenu>
          <Space size={30} direction="vertical">
            {showLogoInSider ? <StyledLogo>
              <SiderLink href="/tests">
                <Logo />
              </SiderLink>
            </StyledLogo> : null}
            {renderedMenuItems}
          </Space>
        </StyledNavigationMenu>
        {showSocialLinksInSider ? (
          <StyledOther size={20} direction="vertical">
            {renderedOtherMenuItems}
          </StyledOther>
        ) : null}
      </StyledSiderChildContainer>
    </StyledSider>
  );
};

export default Sider;
