import {FC} from 'react';

import {Form} from 'antd';

import {notificationCall} from '@molecules/Notification';

import {CardForm} from '@organisms/CardForm';
import {ConditionFormItems} from '@organisms/TriggersFormItems/ConditionFormItems';

import {getConditionFormValues, getResourceIdentifierSelector} from '@pages/Triggers/utils';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTriggerByIdMutation} from '@services/triggers';

import {useClusterDetailsPick} from '@store/clusterDetails';
import {useTriggersField} from '@store/triggers';

import {displayDefaultNotificationFlow} from '@utils/notification';

export const Condition: FC = () => {
  const {namespace} = useClusterDetailsPick('namespace');
  const [currentTrigger, setCurrentTrigger] = useTriggersField('current');

  const mayEdit = usePermission(Permissions.editEntity);

  const [updateTrigger] = useUpdateTriggerByIdMutation();

  const [form] = Form.useForm();

  const onFinish = () => {
    const values = form.getFieldsValue();

    const resourceSelector = getResourceIdentifierSelector(
      values.resourceLabelSelector || values.resourceNameSelector,
      namespace
    );

    const body = {
      ...currentTrigger!,
      resource: values.resource,
      event: values.event,
      resourceSelector,
    };

    return updateTrigger(body)
      .then(displayDefaultNotificationFlow)
      .then(res => {
        notificationCall('passed', 'Trigger was successfully updated.');
        setCurrentTrigger(res.data);
        form.setFieldsValue(getConditionFormValues(res.data));
      });
  };

  return (
    <CardForm
      name="trigger-condition"
      title="Trigger condition"
      description="Define the conditions to be met for the trigger to be called."
      form={form}
      initialValues={getConditionFormValues(currentTrigger!)}
      disabled={!mayEdit}
      onConfirm={onFinish}
    >
      <ConditionFormItems />
    </CardForm>
  );
};
