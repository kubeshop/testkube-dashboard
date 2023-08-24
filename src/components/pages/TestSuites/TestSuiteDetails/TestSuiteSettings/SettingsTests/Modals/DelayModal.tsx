import {FC, useEffect, useRef, useState} from 'react';

import {Input} from 'antd';

import {Button} from '@custom-antd/Button';
import {CustomModal as Modal} from '@custom-antd/Modal';

import {usePressEnter} from '@hooks/usePressEnter';

import {notificationCall} from '@molecules/Notification';

import {StyledDelayModalContent} from '@pages/TestSuites/TestSuiteDetails/TestSuiteSettings/SettingsTests.styled';

type DelayModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (delay: string) => void;
};

export const DelayModal: FC<DelayModalProps> = props => {
  const {visible, onClose, onSubmit} = props;

  const [delayValue, setDelayValue] = useState<string>('');

  const delayInputRef = useRef(null);

  const onEvent = usePressEnter();

  const onConfirm = () => {
    if (/^([0-9]|([1-9][0-9]+))(ms|s|m|h)?$/.test(delayValue)) {
      onSubmit(delayValue);

      setDelayValue('');
      onClose();
    } else {
      notificationCall('failed', 'Invalid delay format');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (visible && delayInputRef.current) {
        // @ts-ignore
        delayInputRef.current!.focus();
      }
    }, 100);
  }, [visible]);

  return (
    <Modal
      setIsModalVisible={onClose}
      isModalVisible={visible}
      width={528}
      title="Add a delay"
      footer={
        <>
          <Button
            $customType="secondary"
            onClick={() => {
              onClose();
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
