import {useState} from 'react';

import {Space} from 'antd';

import {Button, FullWidthSpace, Text} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import usePressEnter from '@hooks/usePressEnter';

import Colors from '@styles/Colors';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {notificationCall} from '..';

import {DeleteModalWrapper} from './DeleteModal.styled';

interface DeleteModalProps {
  onDelete: (id: string) => Promise<any>;
  onClose: () => void;
  onConfirm?: () => void;
  content?: React.ReactNode;
  contentSize?: number;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actionText?: string;
  actionDisabled?: boolean;
  defaultStackRoute?: string;
  successMessage: string;
  deleteOnEnter?: boolean;
  idToDelete: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  onClose,
  onDelete,
  onConfirm,
  content,
  contentSize,
  title,
  subtitle,
  actionText,
  actionDisabled,
  defaultStackRoute,
  successMessage,
  deleteOnEnter = false,
  idToDelete,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const back = useDashboardNavigate(defaultStackRoute || '');
  const onEvent = usePressEnter();

  const onDeleteCallback = async () => {
    setIsLoading(true);
    onDelete(idToDelete)
      .then(displayDefaultNotificationFlow)
      .then(() => {
        notificationCall('passed', successMessage);
        onClose();
        if (onConfirm) {
          onConfirm();
        } else if (defaultStackRoute) {
          back();
        }
      })
      .catch(error => {
        notificationCall('failed', error.title, error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <DeleteModalWrapper>
      {content || (
        <FullWidthSpace
          size={contentSize || 16}
          direction="vertical"
          onKeyPress={event => {
            onEvent(event, onDeleteCallback);
          }}
        >
          <Text className="regular middle" color={Colors.slate400}>
            {title}
          </Text>
          <Text className="regular middle" color={Colors.slate400}>
            {subtitle}
          </Text>
        </FullWidthSpace>
      )}
      <Space style={{justifyContent: 'flex-end'}}>
        <Button $customType="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button $customType="warning" onClick={onDeleteCallback} disabled={actionDisabled} loading={isLoading}>
          {actionText || 'Delete'}
        </Button>
      </Space>
    </DeleteModalWrapper>
  );
};

export default DeleteModal;
