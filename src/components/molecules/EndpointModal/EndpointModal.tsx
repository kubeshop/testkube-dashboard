import React, {useContext, useEffect, useState} from 'react';

import {notification} from 'antd';

import axios from 'axios';

import {config} from '@constants/config';

import {useAppSelector} from '@redux/hooks';
import {selectApiEndpoint, setApiEndpoint} from '@redux/reducers/configSlice';

import {Button, Input, Modal, Text} from '@custom-antd';

import {MainContext} from '@contexts';

import {hasProtocol} from '@src/utils/strings';

import env from '../../../env';
import {StyledFormContainer, StyledSearchUrlForm} from './EndpointModal.styled';

type EndpointModalProps = {
  isModalVisible: (isVisible: boolean) => void;
  visible: boolean;
};

axios.defaults.baseURL = localStorage.getItem('apiEndpoint') || env?.apiUrl;

const EndpointModal: React.FC<EndpointModalProps> = props => {
  const {isModalVisible, visible} = props;

  const apiEndpointRedux = useAppSelector(selectApiEndpoint);

  const defaultApiEndpoint = apiEndpointRedux || localStorage.getItem('apiEndpoint') || env?.apiUrl;

  const {dispatch, location} = useContext(MainContext);

  const [apiEndpoint, setApiEndpointHook] = useState(defaultApiEndpoint);
  const [isLoading, setLoading] = useState(false);

  const checkURLWorkingState = async (url: string): Promise<any> => {
    try {
      await fetch(url)
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.version && res.commit) {
            const targetUrl = url.replace('/info', '');

            axios.defaults.baseURL = targetUrl;

            localStorage.setItem(config.apiEndpoint, targetUrl);

            dispatch(setApiEndpoint(targetUrl));

            setApiEndpointHook(targetUrl);

            setLoading(false);

            isModalVisible(false);
          } else {
            notification.error({
              message: 'Could not receive data from the specified api endpoint',
              duration: 0,
            });

            setLoading(false);
          }
        });
    } catch (err) {
      if (err) {
        setLoading(false);

        return notification.error({
          message: 'Could not receive data from the specified api endpoint',
          duration: 0,
        });
      }
    }
  };

  const handleOpenUrl = (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const endsWithV1 = apiEndpoint.endsWith('/v1');

    if (hasProtocol(apiEndpoint)) {
      if (endsWithV1) {
        checkURLWorkingState(`${apiEndpoint}/info`);
      } else {
        checkURLWorkingState(`${apiEndpoint}/v1/info`);
      }
    } else {
      const targetProtocol = `${window.location.protocol}//`;

      if (endsWithV1) {
        checkURLWorkingState(`${targetProtocol}${apiEndpoint}/info`);
      } else {
        checkURLWorkingState(`${targetProtocol}${apiEndpoint}/v1/info`);
      }
    }
  };

  useEffect(() => {
    if (defaultApiEndpoint) {
      dispatch(setApiEndpoint(defaultApiEndpoint));

      localStorage.setItem('apiEndpoint', defaultApiEndpoint);
    }
  }, []);

  useEffect(() => {
    if (apiEndpointRedux) {
      setApiEndpointHook(apiEndpointRedux);
    }
  }, [apiEndpointRedux, visible]);

  useEffect(() => {
    if (!apiEndpoint) {
      isModalVisible(true);
    }
  }, []);

  return (
    <Modal
      title="Testkube API endpoint"
      isModalVisible={visible}
      footer={null}
      setIsModalVisible={isModalVisible}
      content={
        <StyledSearchUrlForm onSubmit={handleOpenUrl} data-cy="modal-api-endpoint">
          <Text>
            Please provide the Testkube API endpoint for your installation, which will have been provided to you by the
            Testkube installer -{' '}
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
              value={apiEndpoint}
              width="300px"
            />
            <Button type="primary" htmlType="submit" disabled={isLoading} loading={isLoading}>
              Get results
            </Button>
          </StyledFormContainer>
        </StyledSearchUrlForm>
      }
    />
  );
};

export default EndpointModal;
