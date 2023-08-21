import {Form} from 'antd';

import {notificationCall} from '@molecules';

import {ActionFormItems, CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTriggerByIdMutation} from '@services/triggers';

import {useClusterDetailsPick} from '@store/clusterDetails';
import {useTriggersField} from '@store/triggers';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {getActionFormValues, getResourceIdentifierSelector} from '../../../utils';

const TriggerAction: React.FC = () => {
  const {namespace} = useClusterDetailsPick('namespace');
  const [currentTrigger, setCurrentTrigger] = useTriggersField('current');

  const mayEdit = usePermission(Permissions.editEntity);

  const [updateTrigger] = useUpdateTriggerByIdMutation();

  const [form] = Form.useForm();

  const initialValues = getActionFormValues(currentTrigger!);

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
      initialValues={initialValues}
      disabled={!mayEdit}
      onConfirm={onFinish}
    >
      <ActionFormItems />
    </CardForm>
  );
};

export default TriggerAction;
