import React, {useContext, useEffect, useState} from 'react';

import {Space} from 'antd';

import axios from 'axios';

import {config} from '@constants/config';

import {setApiEndpoint, setNamespace} from '@redux/reducers/configSlice';

import {Button, Input, Modal, Text} from '@custom-antd';

import {checkAPIEndpoint} from '@utils/endpoint';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import env from '../../../env';
import notificationCall from '../Notification/Notification';
import {StyledSearchUrlForm} from './EndpointModal.styled';

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
            notificationCall('failed', 'Could not receive data from the specified API endpoint');

            setLoading(false);
          }
        });
    } catch (err) {
      if (err) {
        setModalState(true);

        setLoading(false);

        return notificationCall('failed', 'Could not receive data from the specified API endpoint');
      }
    }
  };

  const handleOpenUrl = (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    checkAPIEndpoint(apiEndpoint, checkURLWorkingState);
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
      checkAPIEndpoint(apiEndpoint, checkURLWorkingState);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('apiEndpoint')) {
      setModalState(true);
    }
  }, [localStorage.getItem('apiEndpoint')]);

  return (
    <Modal
      title="Testkube API endpoint"
      isModalVisible={visible}
      setIsModalVisible={setModalState}
      dataTestModalRoot="endpoint-modal"
      dataTestCloseBtn="endpoint-modal-close-button"
      width={693}
      content={
        <StyledSearchUrlForm onSubmit={handleOpenUrl} data-cy="modal-api-endpoint">
          <Text>
            We could not detect the right Testkube API endpoint for you. Please enter the API endpoint for your
            installation (e.g. from the output of the Testkube installer)&nbsp;
            <a
              href="https://kubeshop.github.io/testkube/UI/#ui-results-endpoint"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more...
            </a>
          </Text>
          <Space style={{width: '100%'}} size={12}>
            <Input
              id="url"
              name="url"
              onChange={event => {
                setApiEndpointHook(event.target.value);
              }}
              value={apiEndpoint}
              width="550px"
              data-test="endpoint-modal-input"
              placeholder="e.g.: https://my.domain/results/v1"
            />
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading}
              loading={isLoading}
              data-test="endpoint-modal-get-button"
            >
              Save
            </Button>
          </Space>
          <Text color={Colors.slate400} className="regular middle" style={{width: '100%'}}>
            Please make sure the endpoint is accessible from your browser.
          </Text>
        </StyledSearchUrlForm>
      }
      data-test="endpoint-modal"
    />
  );
};

export default EndpointModal;
