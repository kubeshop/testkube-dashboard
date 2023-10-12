import {Space} from 'antd';

import {Button} from '@custom-antd';

import {DeleteModalWrapper} from './DeleteModal.styled';

interface DeleteModalProps {
  onDelete: () => void;
  onCancel: () => void;
  content: React.ReactNode;
}

const DeleteModal: React.FC<DeleteModalProps> = ({onCancel, onDelete, content, ...modalProps}) => {
  return (
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
  );
};

export default DeleteModal;
