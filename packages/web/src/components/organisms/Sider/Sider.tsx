import {useContext, useMemo} from 'react';

import {Tooltip} from 'antd';

import {Icon} from '@atoms';

import {DashboardContext} from '@contexts';

import {FullWidthSpace} from '@custom-antd';

import {useGeneralSlot, useGeneralSlotFirst} from '@plugins/general/hooks';

import {
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

const Sider: React.FC = () => {
  const {location} = useContext(DashboardContext);
  const siderLogo = useGeneralSlotFirst('siderLogo');
  const siderMenuList = useGeneralSlot('siderItems');
  const otherMenuItems = useGeneralSlot('siderOtherItems');

  const renderedMenuItems = useMemo(() => {
    return siderMenuList.map(route => {
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
  }, [siderMenuList]);

  const renderedOtherMenuItems = useMemo(() => {
    return otherMenuItems.map(otherMenuItem => {
      const {icon, onClick, size = 20, dropdownComponent, title, active} = otherMenuItem;

      if (dropdownComponent) {
        return (
          <StyledOtherItem key={icon} $size={size}>
            {dropdownComponent}
          </StyledOtherItem>
        );
      }

      // TODO: Build as separate component
      return (
        <StyledOtherItem
          key={icon}
          $size={size}
          className={active?.test(location.pathname) || active?.test(window.location.pathname) ? 'active' : undefined}
        >
          <Tooltip title={title} placement="right">
            {/* @ts-ignore */}
            <Icon name={icon} onClick={onClick} />
          </Tooltip>
        </StyledOtherItem>
      );
    });
  }, [location.pathname, window.location.pathname]);

  return (
    <StyledSider width={100} data-cy="navigation-sider">
      <StyledSiderChildContainer>
        <StyledNavigationMenu>
          <FullWidthSpace size={30} direction="vertical">
            {siderLogo ? (
              <StyledLogo>
                <SiderLink href="/">{siderLogo}</SiderLink>
              </StyledLogo>
            ) : null}
            {renderedMenuItems}
          </FullWidthSpace>
        </StyledNavigationMenu>
        {renderedOtherMenuItems.length > 0 ? (
          <StyledOther size={20} direction="vertical">
            {renderedOtherMenuItems}
          </StyledOther>
        ) : null}
      </StyledSiderChildContainer>
    </StyledSider>
  );
};

export default Sider;
