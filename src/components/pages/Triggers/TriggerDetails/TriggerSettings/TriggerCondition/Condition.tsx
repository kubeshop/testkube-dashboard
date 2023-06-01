import {Form} from 'antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {ConditionFormItems} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useAppSelector} from '@redux/hooks';
import {selectNamespace} from '@redux/reducers/configSlice';

import {useUpdateTriggerByIdMutation} from '@services/triggers';

import {useStore} from '@store';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {getResourceIdentifierSelector} from '../../../utils';

const Condition: React.FC = () => {
  const {currentTrigger, setCurrentTrigger} = useStore(state => ({
    currentTrigger: state.currentTrigger!,
    setCurrentTrigger: state.setCurrentTrigger,
  }));
  const appNamespace = useAppSelector(selectNamespace);

  const mayEdit = usePermission(Permissions.editEntity);

  const [updateTrigger] = useUpdateTriggerByIdMutation();

  const [form] = Form.useForm();

  const {
    resourceSelector: {name, namespace, labelSelector: currentLabelSelector},
    resource,
    event,
  } = currentTrigger;
  const nameSelector = name && namespace ? `${namespace}/${name}` : null;
  const labelSelector = currentLabelSelector?.matchLabels;

  const onFinish = () => {
    const values = form.getFieldsValue();

    const resourceSelector = getResourceIdentifierSelector(
      values.resourceLabelSelector || values.resourceNameSelector,
      appNamespace
    );

    const body = {
      ...currentTrigger,
      resource: values.resource,
      event: values.event,
      resourceSelector,
    };

    return updateTrigger(body)
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => {
        notificationCall('passed', 'Trigger was successfully updated.');
        setCurrentTrigger(body);
      });
  };

  return (
    <Form
      form={form}
      name="trigger-condition"
      initialValues={{resource, resourceLabelSelector: labelSelector, resourceNameSelector: nameSelector, event}}
      layout="vertical"
      disabled={!mayEdit}
    >
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
