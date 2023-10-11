import {Space} from 'antd';

import {Button, Modal} from '@custom-antd';
import {ModalProps} from '@custom-antd/Modal/Modal';

import {DeleteModalWrapper} from './DeleteModal.styled';

interface DeleteModalProps extends ModalProps {
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({onDelete, setIsModalVisible, content, ...modalProps}) => {
  const onCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      setIsModalVisible={setIsModalVisible}
      {...modalProps}
      content={
        <DeleteModalWrapper>
          {content}
          <Space style={{justifyContent: 'flex-end'}}>
            <Button $customType="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button $customType="warning" onClick={onDelete}>
              Delete
            </Button>
          </Space>
        </DeleteModalWrapper>
      }
    />
  );
};

export default DeleteModal;
