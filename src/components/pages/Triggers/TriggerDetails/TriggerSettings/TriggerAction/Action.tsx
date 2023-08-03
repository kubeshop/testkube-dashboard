import {Form} from 'antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {ActionFormItems} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useAppSelector} from '@redux/hooks';
import {selectNamespace} from '@redux/reducers/configSlice';

import {useUpdateTriggerByIdMutation} from '@services/triggers';

import {useTriggersField} from '@store/triggers';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {getActionFormValues, getResourceIdentifierSelector} from '../../../utils';

const Condition: React.FC = () => {
  const [currentTrigger, setCurrentTrigger] = useTriggersField('current');

  const appNamespace = useAppSelector(selectNamespace);

  const mayEdit = usePermission(Permissions.editEntity);

  const [updateTrigger] = useUpdateTriggerByIdMutation();

  const [form] = Form.useForm();

  const initialValues = getActionFormValues(currentTrigger!);

  const onFinish = () => {
    const values = form.getFieldsValue();

    const testSelector = getResourceIdentifierSelector(
      values.testLabelSelector || values.testNameSelector,
      appNamespace
    );
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
        if (res && 'data' in res) {
          notificationCall('passed', 'Trigger was successfully updated.');
          setCurrentTrigger(res.data);
          form.setFieldsValue(getActionFormValues(res.data));
        }
      });
  };

  return (
    <Form form={form} name="trigger-action" initialValues={initialValues} layout="vertical" disabled={!mayEdit}>
      <ConfigurationCard
        title="Action"
        description="Define the action to be performed on testkube once the conditions are met."
        onConfirm={onFinish}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <ActionFormItems />
      </ConfigurationCard>
    </Form>
  );
};

export default Condition;
