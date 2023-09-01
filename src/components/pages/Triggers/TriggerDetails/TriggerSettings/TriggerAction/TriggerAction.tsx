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
      .then(() => notificationCall('passed', 'Trigger was successfully updated.'));
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

export default TriggerAction;
