import React, {useEffect, useState} from 'react';

import {ExternalLink} from '@atoms';

import {Button, FullWidthSpace, Input, Modal, Text} from '@custom-antd';

import {useApiEndpoint, useUpdateApiEndpoint} from '@services/apiEndpoint';

import Colors from '@styles/Colors';

import notificationCall from '../Notification/Notification';
import {StyledSearchUrlForm} from './EndpointModal.styled';

type EndpointModalProps = {
  setModalState: (isVisible: boolean) => void;
  visible: boolean;
};

const EndpointModal: React.FC<EndpointModalProps> = props => {
  const {setModalState, visible} = props;

  const currentApiEndpoint = useApiEndpoint();
  const updateApiEndpoint = useUpdateApiEndpoint();

  const [value, setValue] = useState(currentApiEndpoint || '');
  const [isLoading, setLoading] = useState(false);

  const updateEndpoint = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    try {
      await updateApiEndpoint(value);
      setModalState(false);
    } catch (error) {
      setModalState(true);
      notificationCall('failed', 'Could not receive data from the specified API endpoint');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue(currentApiEndpoint || '');
  }, [currentApiEndpoint, visible]);

  return (
    <Modal
      title="Testkube API endpoint"
      isModalVisible={visible}
      setIsModalVisible={setModalState}
      dataTestModalRoot="endpoint-modal"
      dataTestCloseBtn="endpoint-modal-close-button"
      width={693}
      content={
        <StyledSearchUrlForm onSubmit={updateEndpoint} data-cy="modal-api-endpoint">
          <Text>
            We could not detect the right Testkube API endpoint for you. Please enter the API endpoint for your
            installation (e.g. from the output of the Testkube installer)&nbsp;
            <ExternalLink href="https://docs.testkube.io/articles/testkube-dashboard-api-endpoint">
              Learn more...
            </ExternalLink>
          </Text>
          <FullWidthSpace size={12}>
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
          </FullWidthSpace>
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
