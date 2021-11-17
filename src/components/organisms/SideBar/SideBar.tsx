import React from 'react';
import styled from 'styled-components';
import {Col, Layout, Menu, Row} from 'antd';
import {useLocation} from 'react-router';
import {Link} from 'react-router-dom';

import {Icon, MenuItem} from '@atoms';
import {QuestionCircleOutlined, SettingFilled, GithubFilled} from '@ant-design/icons';
import {ReactComponent as ChartIcon} from '../../../assets/images/chartIcon.svg';
import {ReactComponent as ListIcon} from '../../../assets/images/listIcon.svg';
import {ReactComponent as Logo} from '../../../assets/images/logo.svg';

const StyledSideBar = styled(Layout.Sider)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  z-index: 1000;
  background: var(--color-dark-secondary);
`;

const StyledLogo = styled.div`
  margin: 20px 20px 40px;
  width: 42px;
  height: 48px;
  opacity: 1;
`;

const SideBar = () => {
  const [visible, setVisible] = React.useState(false);
  const location = useLocation();
  const {pathname} = location;

  const showModal = () => {
    setVisible(!visible);
  };

  const showDocumentation = () => {
    window.open('https://kubeshop.github.io/testkube/');
  };
  const showGithubMainPage = () => {
    window.open('https://github.com/kubeshop/testkube');
  };
  return (
    <StyledSideBar width="80px" collapsed>
      <StyledLogo>
        <Link to="/">
          <Logo />
        </Link>
      </StyledLogo>
      <Menu
        style={{background: 'var(--color-dark-secondary)'}}
        theme="dark"
        defaultSelectedKeys={['/']}
        mode="inline"
        selectedKeys={[pathname]}
      >
        <Row justify="center" gutter={[0, 250]}>
          <Col>
            <MenuItem key="/statistics">
              <Link to="/statistics">
                <Icon component={() => <ChartIcon />} />
              </Link>
            </MenuItem>

            <MenuItem key="/">
              <Link to="/">
                <Icon component={() => <ListIcon />} />
              </Link>
            </MenuItem>
          </Col>
          <Col>
            <MenuItem key="4">
              <Icon onClick={showModal} component={() => <SettingFilled style={{fontSize: 24}} />} />
            </MenuItem>
            <MenuItem key="5">
              <Icon onClick={showGithubMainPage} component={() => <GithubFilled style={{fontSize: 24}} />} />
            </MenuItem>
            <MenuItem key="6">
              <Icon onClick={showDocumentation} component={() => <QuestionCircleOutlined style={{fontSize: 24}} />} />
            </MenuItem>
          </Col>
        </Row>
      </Menu>
    </StyledSideBar>
  );
};

export default SideBar;
