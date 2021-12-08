import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {Modal} from 'antd';

import styled from 'styled-components';

import {config} from '@constants/config';

import {Button, LabelInput, Typography} from '@atoms';

import {FinalizedApiEndpoint, showSmallError} from '@utils';

const StyledSearchUrlForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const modalBodyStyles = {
  backgroundColor: 'var(--color-dark-primary)',
  overflow: 'hidden',
};

const StyledFormContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface IModal {
  isModalVisible: (isVisible: boolean) => void;
  visible?: boolean;
}

const CustomModal = ({isModalVisible, visible}: IModal) => {
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [isLoading, setLoadingState] = useState(false);

  const history = useHistory();

  const handleOpenUrl = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const validatedUrl = FinalizedApiEndpoint(apiEndpoint || `${window.location.host}/results`);

    if (!validatedUrl) {
      return;
    }

    setLoadingState(true);

    const controller = new AbortController();

    setTimeout(() => controller.abort(), 5000);

    return fetch(validatedUrl, {signal: controller.signal})
      .then(res => res.json())
      .then(res => {
        if (res && res.results) {
          localStorage.setItem(config.apiEndpoint, validatedUrl);

          history.push({
            pathname: '/',
            search: `?${new URLSearchParams({apiEndpoint}).toString()}`,
          });

          isModalVisible(false);
        }
      })
      .catch(err => {
        if (err) {
          showSmallError('Failed to fetch test results, please try again...', true, 'center');
        }
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  const handleCancel = () => {
    isModalVisible(false);
  };

  return (
    <>
      <Modal
        title="TestKube API endpoint"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        bodyStyle={modalBodyStyles}
      >
        <StyledSearchUrlForm onSubmit={handleOpenUrl}>
          <Typography variant="secondary" leftAlign>
            Please provide the TestKube API endpoint for your installation, which will have been provided to you by the
            TestKube installer -{' '}
            <a
              href="https://kubeshop.github.io/testkube/dashboard/#dashboard-results-endpoint"
              target="_blank"
              rel="noopener noreferrer"
            >
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
              onChange={event => {
                setApiEndpoint(event.target.value);
              }}
              defaultValue={apiEndpoint}
            />
            <Button type="submit" disableFilter variant="secondary">
              {isLoading ? 'Loading...' : 'Get results'}
            </Button>
          </StyledFormContainer>
        </StyledSearchUrlForm>
      </Modal>
    </>
  );
};

export default CustomModal;
