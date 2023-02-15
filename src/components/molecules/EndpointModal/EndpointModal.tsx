import React, {useContext, useEffect, useState} from 'react';

import {notification} from 'antd';

import axios from 'axios';

import {setApiEndpoint, setNamespace} from '@redux/reducers/configSlice';

import {Button, Input, Modal, Text} from '@custom-antd';

import {MainContext} from '@contexts';

import env from '@src/env';
import {hasProtocol} from '@src/utils/strings';

import {StyledFormContainer, StyledSearchUrlForm} from './EndpointModal.styled';

type EndpointModalProps = {
  setModalState: (isVisible: boolean) => void;
  visible: boolean;
};

const EndpointModal: React.FC<EndpointModalProps> = props => {
  const {setModalState, visible} = props;
  const context = useContext(MainContext);
  const [isLoading, setLoading] = useState(false);

  const [candidate, setCandidate] = useState<string>('');

  const getAPI: () => any = () =>
    candidate || context.apiEndpoint || localStorage.getItem('apiEndpoint') || env?.apiUrl || '';

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
            context.dispatch(setApiEndpoint(targetUrl));
            if (res.namespace) {
              context.dispatch(setNamespace(res.namespace));
            }
            setLoading(false);
            setModalState(false);
            localStorage.setItem('apiEndpoint', candidate);
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

  const checkAPIEndpoint = () => {
    const api = getAPI();
    const endsWithV1 = api?.endsWith('/v1');

    if (hasProtocol(api ?? '')) {
      if (endsWithV1) {
        checkURLWorkingState(`${api}/info`);
      } else {
        checkURLWorkingState(`${api}/v1/info`);
      }
    } else {
      const targetProtocol = `${window.location.protocol}//`;

      if (endsWithV1) {
        checkURLWorkingState(`${targetProtocol}${api}/info`);
      } else {
        checkURLWorkingState(`${targetProtocol}${api}/v1/info`);
      }
    }
  };

  const handleOpenUrl = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
  };

  useEffect(() => {
    if (getAPI() === '') setModalState(true)
  }, [getAPI()]);

  const onConfirm = () => {
    checkAPIEndpoint();
  };

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
              onChange={event => setCandidate(event.target.value)}
              defaultValue={getAPI()}
              width="300px"
              data-test="endpoint-modal-input"
            />
            <Button
              type="primary"
              htmlType="submit"
              onClick={onConfirm}
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
