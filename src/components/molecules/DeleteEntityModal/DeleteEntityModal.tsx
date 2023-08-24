import {useContext, useState} from 'react';

import {Input} from 'antd';

import {MutationDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {capitalize} from 'lodash';

import {ModalContext} from '@contexts';

import {Button, FullWidthSpace, Text} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import usePressEnter from '@hooks/usePressEnter';

import {notificationCall} from '@molecules';

import Colors from '@styles/Colors';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {FooterSpace} from './DeleteEntityModal.styled';

// TODO: refactor using DeleteModal
const DeleteEntityModal: React.FC<{
  // onCancel is passed from parent component <Modal />.
  // Do not pass it directly
  onCancel?: any;
  useDeleteMutation: UseMutation<MutationDefinition<string, any, any, void>>;
  name: string;
  entityLabel: string;
  defaultStackRoute: string;
  idToDelete?: string;
  onConfirm?: any;
}> = props => {
  const {onCancel, useDeleteMutation, name, onConfirm, entityLabel, defaultStackRoute, idToDelete} = props;

  const {setModalOpen} = useContext(ModalContext);
  const back = useDashboardNavigate(defaultStackRoute);

  const onEvent = usePressEnter();

  const [deleteEntity] = useDeleteMutation();

  const [checkName, setName] = useState('');

  const onDelete = () => {
    deleteEntity(idToDelete || name)
      .then(displayDefaultNotificationFlow)
      .then(() => {
        notificationCall('passed', `${capitalize(entityLabel)} was successfully deleted.`);

        setModalOpen(false);

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
          onEvent(event, onDelete);
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
        <Button $customType="warning" disabled={name !== checkName} onClick={onDelete}>
          Delete
        </Button>
      </FooterSpace>
    </FullWidthSpace>
  );
};

export default DeleteEntityModal;
