import React from 'react';
import styled from 'styled-components';
import {Modal} from 'antd';
import {useHistory} from 'react-router-dom';

import {Button, LabelInput, Typography, Spinner} from '@atoms';
import {validateUrl, matchEndpointProtocolWithHostProtocol, checkApiEndpointProtocol} from '@utils';
import {TestsContext} from '@context/testsContext';

const StyledSearchUrlForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const modalStyles = {
  backgroundColor: 'var(--color-dark-primary)',
  overflow: 'hidden',
};

const StyledFormContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface IUrlEndpoint {
  apiEndpoint: string;
}

interface IModal {
  isModalVisible: (isVisible: boolean) => void;
  visible?: boolean;
}

const CustomModal = ({isModalVisible, visible}: IModal) => {
  const [apiEndpoint, setApiEndpoint] = React.useState<IUrlEndpoint>({apiEndpoint: ''});
  const [validUrl, setVAlidUrl] = React.useState<boolean>(false);
  const history = useHistory();
  const tests: any = React.useContext(TestsContext);

  const handleChangeApiEndpoint = (event: React.ChangeEvent<HTMLInputElement>, field: keyof IUrlEndpoint) => {
    setApiEndpoint({...apiEndpoint, [field]: event.target.value});
    const validatedUrl = validateUrl(event.target.value);
    setVAlidUrl(validatedUrl);
  };

  const handleOk = () => {
    isModalVisible(false);
  };

  const handleCancel = () => {
    isModalVisible(false);
  };

  const handleOpenUrl = (event: React.SyntheticEvent) => {
    event.preventDefault();

    matchEndpointProtocolWithHostProtocol(apiEndpoint.apiEndpoint);

    const checked = checkApiEndpointProtocol(apiEndpoint.apiEndpoint);

    history.push({
      pathname: '/',
      // eslint-disable-next-line
      search: '?' + new URLSearchParams({apiEndpoint: checked}).toString(),
    });
  };

  return (
    <>
      {tests.isLoading && <Spinner />}
      <Modal
        title="TestKube API endpoint"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={modalStyles}
      >
        <StyledSearchUrlForm onSubmit={handleOpenUrl}>
          <Typography variant="secondary">
            Please provide the TestKube API endpoint for your installation, which will have been provided to you by the
            TestKube installer.
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
              Get Results
            </Button>
          </StyledFormContainer>
        </StyledSearchUrlForm>
      </Modal>
    </>
  );
};

export default CustomModal;
