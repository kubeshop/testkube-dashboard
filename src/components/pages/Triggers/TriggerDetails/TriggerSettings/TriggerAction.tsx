import {FC} from 'react';

import {Form} from 'antd';

import {notificationCall} from '@molecules/Notification';

import {CardForm} from '@organisms/CardForm';
import {ActionFormItems} from '@organisms/TriggersFormItems/ActionFormItems';

import {getActionFormValues, getResourceIdentifierSelector} from '@pages/Triggers/utils';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTriggerByIdMutation} from '@services/triggers';

import {useClusterDetailsPick} from '@store/clusterDetails';
import {useTriggersField} from '@store/triggers';

import {displayDefaultNotificationFlow} from '@utils/notification';

export const TriggerAction: FC = () => {
  const {namespace} = useClusterDetailsPick('namespace');
  const [currentTrigger, setCurrentTrigger] = useTriggersField('current');

  const mayEdit = usePermission(Permissions.editEntity);

  const [updateTrigger] = useUpdateTriggerByIdMutation();

  const [form] = Form.useForm();

  const onFinish = () => {
    const values = form.getFieldsValue();

    const testSelector = getResourceIdentifierSelector(values.testLabelSelector || values.testNameSelector, namespace);
    const [action, execution] = values.action.split(' ');

    const body = {
      ...currentTrigger!,
      action,
      execution,
      testSelector,
    };

    return updateTrigger(body)
      .then(displayDefaultNotificationFlow)
      .then(res => {
        notificationCall('passed', 'Trigger was successfully updated.');
        setCurrentTrigger(res.data);
        form.setFieldsValue(getActionFormValues(res.data));
      });
  };

  return (
    <CardForm
      name="trigger-action"
      title="Action"
      description="Define the action to be performed on testkube once the conditions are met."
      form={form}
      initialValues={getActionFormValues(currentTrigger!)}
      disabled={!mayEdit}
      onConfirm={onFinish}
    >
      <ActionFormItems />
    </CardForm>
  );
};
