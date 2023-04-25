import {useContext, useState} from 'react';

import {Input, Space} from 'antd';

import {UseMutationType} from '@models/rtk';

import {Button, Text} from '@custom-antd';

import {notificationCall} from '@molecules';

import usePressEnter from '@hooks/usePressEnter';

import {displayDefaultNotificationFlow} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import Colors from '@styles/Colors';

import {DashboardContext} from '@contexts';

import {FooterSpace} from './DeleteEntityModal.styled';

const DeleteEntityModal: React.FC<{
  // onCancel is passed from parent component <Modal />.
  // Do not pass it directly
  onCancel?: any;
  useDeleteMutation: UseMutationType;
  name: string;
  entityLabel: string;
  defaultStackRoute: string;
}> = props => {
  const {onCancel, useDeleteMutation, name, entityLabel, defaultStackRoute} = props;

  const {navigate} = useContext(DashboardContext);

  const onEvent = usePressEnter();

  const [deleteEntity] = useDeleteMutation();

  const [checkName, setName] = useState('');

  const onDelete = () => {
    deleteEntity(name).then(res => {
      displayDefaultNotificationFlow(res, () => {
        notificationCall('passed', `${uppercaseFirstSymbol(entityLabel)} was successfully deleted.`);

        navigate(defaultStackRoute);
      });
    });
  };

  return (
    <Space
      size={24}
      direction="vertical"
      style={{width: '100%'}}
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
        placeholder={`${uppercaseFirstSymbol(entityLabel)} name`}
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
    </Space>
  );
};

export default DeleteEntityModal;
