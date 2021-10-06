import React from 'react';
import styled from 'styled-components';

import {PageTitle} from '@molecules';
import {Image, Modal} from '@atoms';

import ParamsIcon from '@assets/docs.svg';
import docsIcon from '@assets/questionIcon.svg';
import githubIcon from '@assets/githubIcon.svg';

const StyledPAgeHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-light-primary);
  overflow: hidden;
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

  const StyledButton = styled.div`
    cursor: pointer;
  `;

  return (
    <StyledPAgeHeader>
      <PageTitle />
      <StyledHeaderTests>
        <Modal isModalVisible={setVisible} visible={visible} />
        <StyledHeaderLinksButtons>
          <StyledButton>
            <Image src={ParamsIcon} alt="search tests" type="svg" width={30} height={30} onClick={showModal} />
          </StyledButton>
          <a href="https://kubeshop.github.io/kubtest/" target="_blank" rel="noopener">
            <Image src={docsIcon} alt="Docs" type="svg" width={25} height={30} />
          </a>
          <a href="https://github.com/kubeshop/kubtest" target="_blank" rel="noopener">
            <Image src={githubIcon} alt="Docs" type="svg" width={30} height={30} />
          </a>
        </StyledHeaderLinksButtons>
      </StyledHeaderTests>
    </StyledPAgeHeader>
  );
};

export default PageHeader;
