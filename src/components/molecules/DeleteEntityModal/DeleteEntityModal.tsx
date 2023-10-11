import {useState} from 'react';

import {Input} from 'antd';

import {capitalize} from 'lodash';

import {Button, FullWidthSpace, Text} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import usePressEnter from '@hooks/usePressEnter';

import {useModal} from '@modal/hooks';

import {notificationCall} from '@molecules';

import Colors from '@styles/Colors';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {FooterSpace} from './DeleteEntityModal.styled';

// TODO: refactor using DeleteModal
const DeleteEntityModal: React.FC<{
  // onCancel is passed from parent component <Modal />.
  // Do not pass it directly
  onCancel?: any;
  onDelete: (id: string) => Promise<any>;
  name: string;
  entityLabel: string;
  defaultStackRoute: string;
  idToDelete?: string;
  onConfirm?: any;
}> = props => {
  const {onCancel, onDelete, name, onConfirm, entityLabel, defaultStackRoute, idToDelete} = props;

  const {close} = useModal();
  const back = useDashboardNavigate(defaultStackRoute);

  const onEvent = usePressEnter();

  const [checkName, setName] = useState('');

  const deleteCallback = () => {
    onDelete(idToDelete || name)
      .then(displayDefaultNotificationFlow)
      .then(() => {
        notificationCall('passed', `${capitalize(entityLabel)} was successfully deleted.`);
        close();

        if (onConfirm) {
          onConfirm();
        } else {
          back();
        }
      })
      .catch(error => {
        notificationCall('failed', error.title, error.message);
      });
  };

  return (
    <FullWidthSpace
      size={24}
      direction="vertical"
      onKeyPress={event => {
        if (name === checkName) {
          onEvent(event, deleteCallback);
        }
      }}
    >
      <Text className="regular middle" color={Colors.slate400}>
        Do you really want to delete this {entityLabel}?
        <br />
        All your historical and analytical data will also be removed.
      </Text>
      <Text className="regular middle" color={Colors.slate400}>
        Please enter the name of this {entityLabel} (<span style={{color: Colors.whitePure}}>{name}</span>) to delete it
        forever.
      </Text>
      <Input
        placeholder={`${capitalize(entityLabel)} name`}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <FooterSpace size={10}>
        <Button $customType="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button $customType="warning" disabled={name !== checkName} onClick={deleteCallback}>
          Delete
        </Button>
      </FooterSpace>
    </FullWidthSpace>
  );
};

export default DeleteEntityModal;
