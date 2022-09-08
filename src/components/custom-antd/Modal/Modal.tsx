import {cloneElement} from 'react';

import {StyledModal} from './Modal.styled';

type ModalProps = {
  title: string;
  width?: number;
  footer: React.ReactNode;
  content: React.ReactNode;
  isModalVisible: boolean;
  setIsModalVisible: (flag: boolean) => void;
};

const CustomModal: React.FC<ModalProps> = props => {
  const {setIsModalVisible, isModalVisible, footer, width = 528, title, content} = props;

  const onCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <StyledModal title={title} centered visible={isModalVisible} onCancel={onCancel} width={width} footer={footer}>
      {/* @ts-ignore */}
      {cloneElement(content, {onCancel})}
    </StyledModal>
  );
};

export default CustomModal;
