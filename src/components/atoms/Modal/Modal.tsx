import React, {useState} from 'react';
import styled from 'styled-components';
import {Modal} from 'antd';
import {useHistory} from 'react-router-dom';

import {Button, LabelInput, Typography, Spinner} from '@atoms';
import {validateUrl, FinalizedApiEndpoint, showSmallError} from '@utils';
import {config} from '@constants/config';
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
  const [apiEndpoint, setApiEndpoint] = useState<IUrlEndpoint>({apiEndpoint: ''});
  const [validUrl, setVAlidUrl] = useState<boolean>(false);
  const [buttonLabelContent, setLabelButtonContent] = useState<string>('Get Results');
  const history = useHistory();
  const tests: any = React.useContext(TestsContext);

  const handleInputApiEndpoint = (event: React.ChangeEvent<HTMLInputElement>, field: keyof IUrlEndpoint) => {
    setApiEndpoint({...apiEndpoint, [field]: event.target.value});

    const validatedUrl = validateUrl(event.target.value);

    setVAlidUrl(validatedUrl);
  };

  const handleOpenUrl = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const validatedUrl = FinalizedApiEndpoint(apiEndpoint.apiEndpoint);
    if (!validatedUrl) {
      return;
    }

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 5000);

    setLabelButtonContent('Validating...');

    return fetch(validatedUrl, {signal: controller.signal})
      .then(res => res.json())
      .then(res => {
        if (res && res.results) {
          localStorage.setItem(config.apiEndpoint, validatedUrl);
          history.push({
            pathname: '/',
            // eslint-disable-next-line
            search: '?' + new URLSearchParams({apiEndpoint: apiEndpoint.apiEndpoint}).toString(),
          });
          setLabelButtonContent('Get Results');
          isModalVisible(false);
        }
      })
      .catch(err => {
        if (err) {
          showSmallError('Failed to fetch test results, please try again...', true, 'center');
          setLabelButtonContent('Get Results');
        }
      });
  };

  const handleCancel = () => {
    isModalVisible(false);
  };

  return (
    <>
      {tests.isLoading && <Spinner />}
      <Modal
        title="TestKube API endpoint"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        bodyStyle={modalStyles}
      >
        <StyledSearchUrlForm onSubmit={handleOpenUrl}>
          <Typography variant="secondary" leftAlign>
            Please provide the TestKube API endpoint for your installation, which will have been provided to you by the
            TestKube installer -{' '}
            <a href="https://kubeshop.github.io/testkube/dashboard/#dashboard-results-endpoint" target="_blank">
              Read More...
            </a>
          </Typography>
          <Typography variant="secondary" leftAlign>
            The endpoint needs to be accessible from your browser and will be used to retrieve test results only.
          </Typography>
          <StyledFormContainer>
            <LabelInput
              id="url"
              name="url"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputApiEndpoint(event, 'apiEndpoint')}
              defaultValue={apiEndpoint.apiEndpoint}
            />
            <Button type="submit" disabled={!validUrl} disableFilter>
              {buttonLabelContent}
            </Button>
          </StyledFormContainer>
        </StyledSearchUrlForm>
      </Modal>
    </>
  );
};

export default CustomModal;
