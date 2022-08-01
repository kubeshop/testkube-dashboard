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
  return (
    <StyledModal
      title={title}
      centered
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      width={width}
      footer={footer}
    >
      {content}
    </StyledModal>
  );
};

export default CustomModal;
