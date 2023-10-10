import {Form} from 'antd';

import {notificationCall} from '@molecules';

import {CardForm, ConditionFormItems} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTriggerByIdMutation} from '@services/triggers';

import {useClusterDetailsPick} from '@store/clusterDetails';
import {useTriggersField} from '@store/triggers';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {getConditionFormValues, getResourceIdentifierSelector} from '../../../utils';

const Condition: React.FC = () => {
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
      .then(() => notificationCall('passed', 'Trigger was successfully updated.'));
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

export default Condition;
