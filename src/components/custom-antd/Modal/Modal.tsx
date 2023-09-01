import {cloneElement} from 'react';

import {CloseOutlined} from '@ant-design/icons';

import {StyledModal} from './Modal.styled';

export type ModalProps = {
  title: string;
  width?: number;
  footer?: React.ReactNode;
  content: React.ReactNode;
  isModalVisible: boolean;
  setIsModalVisible: (flag: boolean) => void;
  dataTestModalRoot?: string;
  dataTestCloseBtn?: string;
};

const Modal: React.FC<ModalProps> = props => {
  const {
    setIsModalVisible,
    isModalVisible,
    footer = null,
    width = 528,
    title,
    content,
    dataTestModalRoot,
    dataTestCloseBtn,
  } = props;

  const onCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <StyledModal
      title={title}
      centered
      maskClosable={false}
      open={isModalVisible}
      onCancel={onCancel}
      width={width}
      footer={footer}
      data-test={dataTestModalRoot}
      closeIcon={<CloseOutlined data-test={dataTestCloseBtn} />}
    >
      {/* @ts-ignore */}
      {cloneElement(content, {onCancel})}
    </StyledModal>
  );
};

export default Modal;
