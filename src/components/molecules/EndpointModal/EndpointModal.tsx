import React, {useContext, useEffect, useState} from 'react';

import axios from 'axios';

import {config} from '@constants/config';

import {setApiEndpoint} from '@redux/reducers/configSlice';

import {Button, Input, Modal, Text} from '@custom-antd';

import {MainContext} from '@contexts';

import env from '../../../env';
import {StyledFormContainer, StyledSearchUrlForm} from './EndpointModal.styled';

type EndpointModalProps = {
  isModalVisible: (isVisible: boolean) => void;
  visible: boolean;
};

axios.defaults.baseURL = localStorage.getItem('apiEndpoint') || env?.apiUrl || `${window.location.origin}/results/v1`;

const EndpointModal: React.FC<EndpointModalProps> = props => {
  const {isModalVisible, visible} = props;

  const defaultApiEndpoint =
    localStorage.getItem('apiEndpoint') || env?.apiUrl || `${window.location.origin}/results/v1`;

  const {dispatch} = useContext(MainContext);

  const [apiEndpoint, setApiEndpointHook] = useState(defaultApiEndpoint);

  const handleOpenUrl = (event: React.FormEvent) => {
    event.preventDefault();

    axios.defaults.baseURL = apiEndpoint;

    localStorage.setItem(config.apiEndpoint, apiEndpoint);

    isModalVisible(false);

    dispatch(setApiEndpoint(apiEndpoint));
  };

  useEffect(() => {
    dispatch(setApiEndpoint(defaultApiEndpoint));

    localStorage.setItem('apiEndpoint', defaultApiEndpoint);
  }, []);

  return (
    <Modal
      title="TestKube API endpoint"
      isModalVisible={visible}
      footer={null}
      setIsModalVisible={isModalVisible}
      content={
        <StyledSearchUrlForm onSubmit={handleOpenUrl} data-cy="modal-api-endpoint">
          <Text>
            Please provide the TestKube API endpoint for your installation, which will have been provided to you by the
            TestKube installer -{' '}
            <a
              href="https://kubeshop.github.io/testkube/UI/#ui-results-endpoint"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More...
            </a>
          </Text>
          <Text>
            The endpoint needs to be accessible from your browser and will be used to retrieve test results only.
          </Text>
          <StyledFormContainer>
            <Input
              id="url"
              name="url"
              onChange={event => {
                setApiEndpointHook(event.target.value);
              }}
              defaultValue={apiEndpoint}
              width="300px"
            />
            <Button type="primary" htmlType="submit">
              Get results
            </Button>
          </StyledFormContainer>
        </StyledSearchUrlForm>
      }
    />
  );
};

export default EndpointModal;
