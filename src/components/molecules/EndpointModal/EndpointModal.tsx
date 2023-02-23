import React, {useContext, useEffect, useState} from 'react';

import {notification} from 'antd';

import axios from 'axios';

import {config} from '@constants/config';

import {setApiEndpoint, setNamespace} from '@redux/reducers/configSlice';

import {Button, Input, Modal, Text} from '@custom-antd';

import {hasProtocol} from '@utils/strings';

import {MainContext} from '@contexts';

import env from '../../../env';
import {StyledFormContainer, StyledSearchUrlForm} from './EndpointModal.styled';
import Colors from '@styles/Colors';

type EndpointModalProps = {
  setModalState: (isVisible: boolean) => void;
  visible: boolean;
};

axios.defaults.baseURL = localStorage.getItem('apiEndpoint') || env?.apiUrl;

const EndpointModal: React.FC<EndpointModalProps> = props => {
  const {setModalState, visible} = props;

  const {dispatch, apiEndpoint: apiEndpointRedux} = useContext(MainContext);

  const defaultApiEndpoint = apiEndpointRedux || localStorage.getItem('apiEndpoint') || env?.apiUrl;

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

            if (res.namespace) {
              dispatch(setNamespace(res.namespace));
            }

            setApiEndpointHook(targetUrl);

            setLoading(false);

            setModalState(false);
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
        setModalState(true);

        setLoading(false);

        return notification.error({
          message: 'Could not receive data from the specified api endpoint',
          duration: 0,
        });
      }
    }
  };

  const checkAPIEndpoint = () => {
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

  const handleOpenUrl = (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    checkAPIEndpoint();
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
      setModalState(true);
    } else {
      checkAPIEndpoint();
    }
  }, []);

  return (
    <Modal
      title="Testkube API endpoint"
      isModalVisible={visible}
      setIsModalVisible={setModalState}
      dataTestModalRoot="endpoint-modal"
      dataTestCloseBtn="endpoint-modal-close-button"
      content={
        <StyledSearchUrlForm onSubmit={handleOpenUrl} data-cy="modal-api-endpoint">
          <Text>
            We could not detect the right Testkube API endpoint for you. 
          </Text>
          <Text>
            Please enter the API endpoint for your installation (e.g. from the outpur of the Testkube installer)
            <a
              href="https://kubeshop.github.io/testkube/UI/#ui-results-endpoint"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more...
            </a>
          </Text>
          <Text color={Colors.slate400} className="regular middle">
            The endpoint needs to be accessible from your browser.
          </Text>
          <StyledFormContainer>
            <Input
              id="url"
              name="url"
              onChange={event => {
                setApiEndpointHook(event.target.value);
              }}
              value={apiEndpoint}
              placeholder="e.g. https://my.domain/results/v1"
              data-test="endpoint-modal-input"
            />
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading}
              loading={isLoading}
              data-test="endpoint-modal-get-button"
            >
              Get results
            </Button>
          </StyledFormContainer>
        </StyledSearchUrlForm>
      }
      data-test="endpoint-modal"
    />
  );
};

export default EndpointModal;
