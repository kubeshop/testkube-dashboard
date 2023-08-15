import {useContext, useMemo} from 'react';

import {QuestionCircleOutlined} from '@ant-design/icons';
import {Popover, Tooltip} from 'antd';

import {ReactComponent as ExecutorsIcon} from '@assets/executor.svg';
import {ReactComponent as SourcesIcon} from '@assets/sources.svg';
import {ReactComponent as TestSuitesIcon} from '@assets/test-suites-icon.svg';
import {ReactComponent as Logo} from '@assets/testkube-symbol-color.svg';
import {ReactComponent as TestsIcon} from '@assets/tests-icon.svg';
import {ReactComponent as TriggersIcon} from '@assets/triggers.svg';
import {ReactComponent as WebhooksIcon} from '@assets/webhooks.svg';

import {Icon} from '@atoms';

import {DashboardContext} from '@contexts';

import {FullWidthSpace, Text} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {ReactComponent as SettingIcon} from '@icons/setting.svg';

import {useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput} from '@redux/reducers/configSlice';

import Colors from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';

import {
  DropdownListItem,
  StyledLogo,
  StyledNavigationMenu,
  StyledOther,
  StyledOtherItem,
  StyledSider,
  StyledSiderChildContainer,
  StyledSiderLink,
} from './Sider.styled';
import SiderLink from './SiderLink';

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
    path: '/webhooks',
    icon: WebhooksIcon,
    title: 'Webhooks',
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
  ...(showSocialLinksInSider
    ? []
    : [
        {
          path: '/settings',
          icon: SettingIcon,
          title: 'Settings',
          transition: {
            classNames: 'item',
          },
          additionalClassName: 'settings-icon',
          active: /environment-management/,
        },
      ]),
];

const Sider: React.FC = () => {
  const {showLogoInSider, showSocialLinksInSider} = useContext(DashboardContext);
  const openSettings = useDashboardNavigate('/settings');
  const {isFullScreenLogOutput} = useAppSelector(selectFullScreenLogOutput);

  const otherMenuItems = [
    {
      icon: 'cog',
      onClick: openSettings,
      title: 'Settings',
    },
    {
      icon: 'documentation',
      dropdownComponent: (
        <Popover
          align={{offset: [0, 13]}}
          placement="rightBottom"
          content={
            <>
              <DropdownListItem>
                <a href={externalLinks.documentation} target="_blank">
                  <Text color={Colors.slate300} className="regular middle">
                    Documentation
                  </Text>
                </a>
              </DropdownListItem>
              <DropdownListItem>
                <a href={externalLinks.discord} target="_blank">
                  <Text color={Colors.slate300} className="regular middle">
                    Discord community
                  </Text>
                </a>
              </DropdownListItem>
              <DropdownListItem>
                <a href={externalLinks.github} target="_blank">
                  <Text color={Colors.slate300} className="regular middle">
                    GitHub
                  </Text>
                </a>
              </DropdownListItem>
            </>
          }
          trigger={['hover']}
        >
          <QuestionCircleOutlined style={{fontSize: 20}} />
        </Popover>
      ),
    },
    {
      icon: 'cloudMigrate',
      title: 'Connect to Testkube Cloud',
      size: 32,
      onClick: () => window.open(externalLinks.OSStoCloudMigration),
    },
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
            <span>
              <MenuIcon style={DEFAULT_ICON_STYLE} />
            </span>
          </Tooltip>
        </StyledSiderLink>
      );
    });
  }, [showSocialLinksInSider]);

  const renderedOtherMenuItems = useMemo(() => {
    return otherMenuItems.map(otherMenuItem => {
      const {icon, onClick, size = 20, dropdownComponent, title} = otherMenuItem;

      if (dropdownComponent) {
        return (
          <StyledOtherItem key={icon} $size={size}>
            {dropdownComponent}
          </StyledOtherItem>
        );
      }

      return (
        <StyledOtherItem key={icon} $size={size}>
          <Tooltip title={title} placement="right">
            {/* @ts-ignore */}
            <Icon name={icon} onClick={onClick} />
          </Tooltip>
        </StyledOtherItem>
      );
    });
  }, []);

  return (
    <StyledSider width={100} data-cy="navigation-sider" $isFullScreenLogOutput={isFullScreenLogOutput}>
      <StyledSiderChildContainer>
        <StyledNavigationMenu>
          <FullWidthSpace size={30} direction="vertical">
            {showLogoInSider ? (
              <StyledLogo>
                <SiderLink href="/tests">
                  <Logo />
                </SiderLink>
              </StyledLogo>
            ) : null}
            {renderedMenuItems}
          </FullWidthSpace>
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
