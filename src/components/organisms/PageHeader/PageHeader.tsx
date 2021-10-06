import React from 'react';
import styled from 'styled-components';
import {Modal} from 'antd';

import {PageTitle} from '@molecules';
import {Button, LabelInput, Typography} from '@atoms';

import {
  matchEndpointProtocolWithHostProtocol,
  validateUrl,
  removeDuplicatesInQueryString,
  checkApiEndpointProtocol,
} from '@utils/validate';

import {QuestionCircleOutlined, GithubOutlined, SettingOutlined} from '@ant-design/icons';

interface IUrlEndpoint {
  apiEndpoint: string;
}

const StyledPAgeHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-light-primary);
  overflow: hidden;
`;

const StyledSearchUrlForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const StyledFormContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PageHeader = () => {
  const [apiEndpoint, setApiEndpoint] = React.useState<IUrlEndpoint>({apiEndpoint: ''});
  const [validUrl, setVAlidUrl] = React.useState<boolean>(false);
  const [visible, setVisible] = React.useState(false);

  const modalStyles = {
    backgroundColor: 'var(--color-dark-primary)',
    height: '300px',
    overflow: 'hidden',
  };

  const handleOpenUrl = (event: React.SyntheticEvent) => {
    event.preventDefault();

    removeDuplicatesInQueryString(window.location.href);
    matchEndpointProtocolWithHostProtocol(apiEndpoint.apiEndpoint);

    const checked = checkApiEndpointProtocol(apiEndpoint.apiEndpoint);

    window.open(`${window.location.origin}/?apiEndpoint=${checked}`);
  };

  const handleChangeApiEndpoint = (event: React.ChangeEvent<HTMLInputElement>, field: keyof IUrlEndpoint) => {
    setApiEndpoint({...apiEndpoint, [field]: event.target.value});
    const validatedUrl = validateUrl(apiEndpoint.apiEndpoint);
    setVAlidUrl(validatedUrl);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showDocumentation = () => {
    window.open('https://kubeshop.github.io/kubtest/');
  };
  const showGithubMainPage = () => {
    window.open('https://github.com/kubeshop/kubtest');
  };
  return (
    <StyledPAgeHeader>
      <PageTitle />
      <StyledHeaderTests>
        <Modal
          title="Kubtest API endpoint"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          bodyStyle={modalStyles}
        >
          <StyledSearchUrlForm onSubmit={handleOpenUrl}>
            <Typography variant="secondary">
              Please provide the Kubtest API endpoint for your installation, which will have been provided to you by the
              kubtest installer.
            </Typography>
            <Typography variant="secondary">
              The endpoint needs to be accessible from your browser and will be used to retrieve test results only.
            </Typography>
            <StyledFormContainer>
              <LabelInput
                id="url"
                name="url"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeApiEndpoint(event, 'apiEndpoint')}
                defaultValue={apiEndpoint.apiEndpoint}
              />
              <Button type="submit" disabled={!validUrl} disableFilter>
                Get tests
              </Button>
            </StyledFormContainer>
          </StyledSearchUrlForm>
        </Modal>
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
