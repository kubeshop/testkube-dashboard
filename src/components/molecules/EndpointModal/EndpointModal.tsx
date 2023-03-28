import React, {useContext, useEffect, useState} from 'react';

import {Space} from 'antd';

import {setNamespace} from '@redux/reducers/configSlice';

import {Button, Input, Modal, Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import {getApiDetails, getApiEndpoint, saveApiEndpoint, useApiEndpoint} from '@services/apiEndpoint';

import notificationCall from '../Notification/Notification';
import {StyledSearchUrlForm} from './EndpointModal.styled';

type EndpointModalProps = {
  setModalState: (isVisible: boolean) => void;
  visible: boolean;
};

const EndpointModal: React.FC<EndpointModalProps> = props => {
  const {setModalState, visible} = props;

  const {dispatch} = useContext(MainContext);
  const currentApiEndpoint = useApiEndpoint();

  const [value, setValue] = useState(currentApiEndpoint || '');
  const [isLoading, setLoading] = useState(false);

  const checkApiEndpoint = async (endpoint: string) => {
    const prevApiEndpoint = currentApiEndpoint;
    try {
      const {url, namespace} = await getApiDetails(endpoint);

      // Handle race condition, when endpoint has been changed externally,
      // i.e. via EndpointProcessing page.
      if (getApiEndpoint() !== prevApiEndpoint) {
        return;
      }

      saveApiEndpoint(url);
      dispatch(setNamespace(namespace));

      setModalState(false);
    } catch (error) {
      // Handle race condition, when endpoint has been changed externally,
      // i.e. via EndpointProcessing page.
      if (getApiEndpoint() !== prevApiEndpoint) {
        return;
      }

      setModalState(true);
      notificationCall('failed', 'Could not receive data from the specified API endpoint');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUrl = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    checkApiEndpoint(value);
  };

  useEffect(() => {
    setValue(currentApiEndpoint || '');
  }, [currentApiEndpoint, visible]);

  // FIXME: This component should not control that
  useEffect(() => {
    if (!currentApiEndpoint) {
      setModalState(true);
    } else {
      checkApiEndpoint(currentApiEndpoint);
    }
  }, [currentApiEndpoint]);

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
                setValue(event.target.value);
              }}
              value={value}
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
