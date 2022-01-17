import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';

import {Tooltip} from 'antd';

import {
  BarChartOutlined,
  BarsOutlined,
  DashboardOutlined,
  GithubFilled,
  QuestionCircleOutlined,
  SettingFilled,
  UnorderedListOutlined,
} from '@ant-design/icons';

import {Modal} from '@atoms';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {openDiscord, openDocumentation, openGithub} from '@utils/externalLinks';

import {ReactComponent as DiscordLogo} from '@assets/DiscordLogo.svg';
import {ReactComponent as Logo} from '@assets/logo.svg';

import {
  StyledCol,
  StyledLogo,
  StyledMenu,
  StyledMenuItem,
  StyledNavigation,
  StyledOther,
  StyledSider,
} from './SideBar.styled';

const ICON_STYLE = {
  fontSize: 24,
};

const SideBar = () => {
  const [isModalVisible, toggleModal] = useState(false);

  const location = useLocation();

  const {pathname} = location;

  const searchParams = useURLSearchParams();

  useEffect(() => {
    if (!searchParams.apiEndpoint && !localStorage.getItem('apiEndpoint')) {
      toggleModal(true);
    }
  }, []);

  return (
    <StyledSider width={80} collapsed>
      {isModalVisible && <Modal visible isModalVisible={() => toggleModal(prev => !prev)} />}
      <StyledMenu theme="dark" defaultSelectedKeys={['/dashboard/tests']} mode="inline" selectedKeys={[pathname]}>
        <StyledLogo>
          <NavLink to="/dashboard/tests">
            <Logo />
          </NavLink>
        </StyledLogo>
        <StyledCol>
          <StyledNavigation>
            <Tooltip title="Tests" placement="right" color="#1890fc">
              <NavLink to="/dashboard/tests">
                <StyledMenuItem icon={<BarsOutlined style={ICON_STYLE} key="/dashboard/tests" />} />
              </NavLink>
            </Tooltip>
            <Tooltip title="Test executions" placement="right" color="#1890fc">
              <NavLink to="/dashboard/test-executions">
                <StyledMenuItem icon={<UnorderedListOutlined style={ICON_STYLE} />} key="/dashboard/test-executions" />
              </NavLink>
            </Tooltip>
            <Tooltip title="Scripts" placement="right" color="#1890fc">
              <NavLink to="/dashboard/scripts">
                <StyledMenuItem icon={<BarChartOutlined style={ICON_STYLE} />} key="/dashboard/scripts" />
              </NavLink>
            </Tooltip>
            <Tooltip title="Executions" placement="right" color="#1890fc">
              <NavLink to="/dashboard/executions">
                <StyledMenuItem icon={<DashboardOutlined style={ICON_STYLE} />} key="/dashboard/executions" />
              </NavLink>
            </Tooltip>
          </StyledNavigation>
          <StyledOther>
            <StyledMenuItem onClick={() => toggleModal(prev => !prev)} icon={<SettingFilled style={ICON_STYLE} />} />
            <Tooltip title="Github" placement="right" color="#1890fc">
              <StyledMenuItem onClick={openGithub} icon={<GithubFilled style={ICON_STYLE} />} />
            </Tooltip>
            <Tooltip title="Discord" placement="right" color="#1890fc">
              <StyledMenuItem onClick={openDiscord} icon={<DiscordLogo style={{width: 24, height: 24}} />} />
            </Tooltip>
            <Tooltip title="Documentation" placement="right" color="#1890fc">
              <StyledMenuItem onClick={openDocumentation} icon={<QuestionCircleOutlined style={ICON_STYLE} />} />
            </Tooltip>
          </StyledOther>
        </StyledCol>
      </StyledMenu>
    </StyledSider>
  );
};

export default SideBar;
