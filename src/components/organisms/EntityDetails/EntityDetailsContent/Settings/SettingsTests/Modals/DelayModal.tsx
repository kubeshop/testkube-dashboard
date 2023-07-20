import React, {useEffect, useRef, useState} from 'react';

import {Input} from 'antd';

import {Button, Modal} from '@custom-antd';

import usePressEnter from '@hooks/usePressEnter';

import {notificationCall} from '@src/components/molecules';

import {StyledDelayModalContent} from '../SettingsTests.styled';

type DelayModalProps = {
  isDelayModalVisible: boolean;
  setIsDelayModalVisible: (flag: boolean) => void;
  addDelay: (delay: string) => void;
};

const DelayModal: React.FC<DelayModalProps> = props => {
  const {isDelayModalVisible, setIsDelayModalVisible, addDelay} = props;

  const [delayValue, setDelayValue] = useState<string>('');

  const delayInputRef = useRef(null);

  const onEvent = usePressEnter();

  const onConfirm = () => {
    if (/^([0-9]|([1-9][0-9]+))(ms|s|m|h)?$/.test(delayValue)) {
      addDelay(delayValue);

      setDelayValue('');
      setIsDelayModalVisible(false);
    } else {
      notificationCall('failed', 'Invalid delay format');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (isDelayModalVisible && delayInputRef.current) {
        // @ts-ignore
        delayInputRef.current!.focus();
      }
    }, 100);
  }, [isDelayModalVisible]);

  return (
    <Modal
      setIsModalVisible={setIsDelayModalVisible}
      isModalVisible={isDelayModalVisible}
      width={528}
      title="Add a delay"
      footer={
        <>
          <Button
            $customType="secondary"
            onClick={() => {
              setIsDelayModalVisible(false);
              setDelayValue('');
            }}
          >
            Cancel
          </Button>
          <Button $customType="primary" onClick={onConfirm}>
            Add delay
          </Button>
        </>
      }
      content={
        <StyledDelayModalContent
          onKeyPress={event => {
            onEvent(event, onConfirm);
          }}
        >
          <Input
            ref={delayInputRef}
            placeholder="e.g.: 1000, 2s"
            value={delayValue}
            onChange={e => setDelayValue(e.target.value)}
          />
        </StyledDelayModalContent>
      }
    />
  );
};

export default DelayModal;
