import {Form} from 'antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {ConditionFormItems} from '@organisms';

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

  const initialValues = getConditionFormValues(currentTrigger!);

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
    <Form form={form} name="trigger-condition" initialValues={initialValues} layout="vertical" disabled={!mayEdit}>
      <ConfigurationCard
        title="Trigger condition"
        description="Define the conditions to be met for the trigger to be called."
        onConfirm={onFinish}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <ConditionFormItems />
      </ConfigurationCard>
    </Form>
  );
};

export default Condition;
