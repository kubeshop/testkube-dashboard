import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {Modal} from 'antd';

import styled from 'styled-components';

import {config} from '@constants/config';

import {useAppDispatch} from '@redux/hooks';
import {setApiEndpoint} from '@redux/reducers/configSlice';

import {Button, LabelInput, Typography} from '@atoms';

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
  const defaultApiEndpoint = localStorage.getItem('apiEndpoint') || process.env.REACT_APP_API_SERVER_ENDPOINT || '';

  const [apiEndpoint, setApiEndpointHook] = useState(defaultApiEndpoint);
  const [isLoading, setLoadingState] = useState(false);

  const history = useHistory();

  const dispatch = useAppDispatch();

  const handleOpenUrl = (event: React.SyntheticEvent) => {
    event.preventDefault();

    localStorage.setItem(config.apiEndpoint, apiEndpoint);

    history.push('/dashboard/tests');

    isModalVisible(false);
    dispatch(setApiEndpoint(apiEndpoint));
  };

  const handleCancel = () => {
    isModalVisible(false);
  };

  useEffect(() => {
    if (defaultApiEndpoint) {
      localStorage.setItem('apiEndpoint', defaultApiEndpoint);
    }
  }, [defaultApiEndpoint]);

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
                setApiEndpointHook(event.target.value);
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
