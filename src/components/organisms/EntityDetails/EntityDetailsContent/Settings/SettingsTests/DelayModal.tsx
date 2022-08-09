import React, {KeyboardEventHandler, useEffect, useMemo, useRef, useState} from 'react';

import {InputNumber} from 'antd';

import {Button, Modal, Text} from '@custom-antd';

import {StyledDelayModalContent} from './SettingsTests.styled';

type DelayModalProps = {
  isDelayModalVisible: boolean;
  setIsDelayModalVisible: (flag: boolean) => void;
  addDelay: (delay?: number) => void;
};

const DelayModal: React.FC<DelayModalProps> = props => {
  const {isDelayModalVisible, setIsDelayModalVisible, addDelay} = props;

  const [delayValue, setDelayValue] = useState<number | undefined>(undefined);
  const isDelayInteger = useMemo(() => Number.isInteger(delayValue), [delayValue]);

  const delayInputRef = useRef(null);

  const handleDelayModalKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.code === 'Enter') {
      onConfirm();
    }
  };

  const onConfirm = () => {
    if (isDelayInteger) {
      addDelay(Number(delayValue));
    }
    setDelayValue(undefined);
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
          <Button customType="secondary" onClick={() => setIsDelayModalVisible(false)}>
            Cancel
          </Button>
          <Button customType="primary" onClick={onConfirm} disabled={!isDelayInteger}>
            Add delay
          </Button>
        </>
      }
      content={
        <StyledDelayModalContent>
          <Text className="regular middle">Delay in ms</Text>
          <InputNumber
            ref={delayInputRef}
            placeholder="Delay"
            controls={false}
            value={delayValue}
            onChange={value => setDelayValue(value)}
            onKeyPress={handleDelayModalKeyPress}
          />
        </StyledDelayModalContent>
      }
    />
  );
};

export default DelayModal;
