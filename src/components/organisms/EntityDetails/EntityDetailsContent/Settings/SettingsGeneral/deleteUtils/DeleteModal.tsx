import {KeyboardEventHandler, useContext, useState} from 'react';

import {Input, Space} from 'antd';

import {BaseQueryFn, FetchArgs, FetchBaseQueryError, MutationDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {Entity} from '@models/entity';

import {Button, Text} from '@custom-antd';

import {notificationCall} from '@molecules';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import Colors from '@styles/Colors';

import {EntityDetailsContext, MainContext} from '@contexts';

import {FooterSpace} from './Modal.styled';

const namingMap: {[key in Entity]: string} = {
  'test-suites': 'test suite',
  tests: 'test',
};

const DeleteModal: React.FC<{
  // onCancel is passed from parent component <Modal />.
  // Do not pass it directly
  onCancel?: any;
  useDeleteMutation: UseMutation<
    MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, {}>, never, void, any>
  >;
}> = props => {
  const {onCancel, useDeleteMutation} = props;

  const {navigate} = useContext(MainContext);
  const {
    entityDetails: {name},
    entity,
    defaultStackRoute,
  } = useContext(EntityDetailsContext);

  const [deleteEntity] = useDeleteMutation();

  const [checkName, setName] = useState('');

  const onDelete = () => {
    deleteEntity(name)
      .then(res => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `${uppercaseFirstSymbol(namingMap[entity])} was successfully deleted.`);

          navigate(defaultStackRoute);
        });
      })
      .catch((err: any) => {
        displayDefaultErrorNotification(err);
      });
  };

  const handleDelayModalKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.code === 'Enter') {
      onDelete();
    }
  };

  return (
    <Space size={24} direction="vertical">
      <Text className="regular middle" color={Colors.slate400}>
        Do you really want to delete this {namingMap[entity]}?
        <br />
        All your historical and analytical data will also be removed.
      </Text>
      <Text className="regular middle" color={Colors.slate400}>
        Please enter the name of this {namingMap[entity]} (<span style={{color: Colors.whitePure}}>{name}</span>) to
        delete it forever.
      </Text>
      <Input
        placeholder={`${uppercaseFirstSymbol(namingMap[entity])} name`}
        onChange={e => {
          setName(e.target.value);
        }}
        onKeyPress={handleDelayModalKeyPress}
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

export default DeleteModal;
