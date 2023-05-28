import {Form} from 'antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {ActionFormItems} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useAppSelector} from '@redux/hooks';
import {selectNamespace} from '@redux/reducers/configSlice';

import {useUpdateTriggerByIdMutation} from '@src/services/triggers';
import {displayDefaultNotificationFlow} from '@src/utils/notification';

import {useShallowGlobalStore} from '@store/GlobalStore';

import {getResourceIdentifierSelector} from '../../../utils';

const Condition: React.FC = () => {
  const {currentTrigger} = useShallowGlobalStore(state => ({
    currentTrigger: state.currentTrigger!,
  }));

  const appNamespace = useAppSelector(selectNamespace);

  const mayEdit = usePermission(Permissions.editEntity);

  const [updateTrigger] = useUpdateTriggerByIdMutation();

  const [form] = Form.useForm();

  const {
    testSelector: {name, labelSelector: currentLabelSelector},
    action,
    execution,
  } = currentTrigger;
  const nameSelector = name;
  const labelSelector = currentLabelSelector?.matchLabels;

  const onFinish = () => {
    const values = form.getFieldsValue();

    const testSelector = getResourceIdentifierSelector(
      values.testLabelSelector || values.testNameSelector,
      appNamespace
    );
    const [_action, _execution] = values.action.split(' ');

    const body = {
      ...currentTrigger,
      action: _action,
      execution: _execution,
      testSelector,
    };

    return updateTrigger(body)
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => {
        notificationCall('passed', 'Trigger was successfully updated.');
      });
  };

  return (
    <Form
      form={form}
      name="trigger-action"
      initialValues={{
        testNameSelector: nameSelector,
        testLabelSelector: labelSelector,
        action: `${action} ${execution}`,
      }}
      layout="vertical"
      disabled={!mayEdit}
    >
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
