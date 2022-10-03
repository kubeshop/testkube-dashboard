/* eslint-disable unused-imports/no-unused-imports-ts */
import {useContext} from 'react';

import {Space} from 'antd';

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

const AbortExecutionModal: React.FC<{
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
    execId
  } = useContext(EntityDetailsContext);

  const [deleteEntity] = useDeleteMutation();

  const onDelete = () => {
    deleteEntity({testId:name, executionId: execId})
      .then(res => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `Execution was successfully deleted.`);

          navigate(defaultStackRoute);
        });
      })
      .catch((err: any) => {
        displayDefaultErrorNotification(err);
      });
  };

  return (
    <Space size={24} direction="vertical">
      <Text className="regular middle" color={Colors.slate400}>
        Do you really want to delete this execution?
      </Text>
      <FooterSpace size={10}>
        <Button $customType="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button $customType="warning" onClick={onDelete}>
          Abort
        </Button>
      </FooterSpace>
    </Space>
  );
};

export default AbortExecutionModal;
