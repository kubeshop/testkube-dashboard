import React from 'react';
import styled from 'styled-components';

import {PageTitle} from '@molecules';

import {Modal} from '@atoms';

import {QuestionCircleOutlined, GithubOutlined, SettingOutlined} from '@ant-design/icons';

const StyledPAgeHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-light-primary);
  overflow: hidden;
  height: 70px;
`;

const StyledHeaderTests = styled.div`
  display: flex;
  flex-flow: row;
`;

const StyledHeaderLinksButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-right: var(--space-lg);
`;

const PageHeader = () => {
  const [visible, setVisible] = React.useState(false);

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
    <StyledPAgeHeader>
      <PageTitle />
      <StyledHeaderTests>
        <Modal isModalVisible={setVisible} visible={visible} />
        <StyledHeaderLinksButtons>
          <SettingOutlined
            size={80}
            style={{color: 'var(--color-monokle-primary)', fontSize: '30px'}}
            onClick={showModal}
          />
          <QuestionCircleOutlined
            size={80}
            style={{color: 'var(--color-monokle-primary)', fontSize: '30px'}}
            onClick={showDocumentation}
          />
          <GithubOutlined
            size={80}
            style={{color: 'var(--color-monokle-primary)', fontSize: '30px'}}
            onClick={showGithubMainPage}
          />
        </StyledHeaderLinksButtons>
      </StyledHeaderTests>
    </StyledPAgeHeader>
  );
};

export default PageHeader;
