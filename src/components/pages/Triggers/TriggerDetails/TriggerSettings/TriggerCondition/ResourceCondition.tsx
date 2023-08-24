import {FC} from 'react';

import {DeleteOutlined} from '@ant-design/icons';
import {Form, Input, InputNumber, Select} from 'antd';

import {Button} from '@custom-antd/Button';
import {FormIconWrapper} from '@custom-antd/Form.styled';
import {FormItem} from '@custom-antd/Form/FormItem';
import {FormItemLabel} from '@custom-antd/Form/FormItem/FormItemLabel';
import {FormRow} from '@custom-antd/Form/FormRow';
import {FullWidthSpace} from '@custom-antd/FullWidthSpace';

import {TestTrigger, TriggerConditionStatus} from '@models/triggers';

import {notificationCall} from '@molecules/Notification';

import {CardForm} from '@organisms/CardForm';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTriggerByIdMutation} from '@services/triggers';

import {useTriggersField, useTriggersPick} from '@store/triggers';

import {requiredNoText} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

export const ResourceCondition: FC = () => {
  const [currentTrigger, setCurrentTrigger] = useTriggersField('current');
  const {keyMap} = useTriggersPick('keyMap');

  const mayEdit = usePermission(Permissions.editEntity);

  const [updateTrigger] = useUpdateTriggerByIdMutation();

  const [form] = Form.useForm<TestTrigger['conditionSpec']>();
  const resourceConditionValue = Form.useWatch('conditions', form);

  const onFinish = () => {
    const {timeout, conditions} = form.getFieldsValue();

    const body = {
      ...currentTrigger!,
      conditionSpec: {
        conditions,
        ...(timeout && {timeout}),
      },
    };

    return updateTrigger(body)
      .then(displayDefaultNotificationFlow)
      .then(res => {
        notificationCall('passed', 'Trigger was successfully updated.');
        setCurrentTrigger(res.data);
        form.setFieldsValue({
          timeout: res.data.conditionSpec?.timeout,
          conditions: res.data.conditionSpec?.conditions || [],
        });
      });
  };

  const isResourceConditionsListEmpty = resourceConditionValue && !resourceConditionValue.length;

  const selectOptions = [
    {label: TriggerConditionStatus.True, value: TriggerConditionStatus.True},
    {label: TriggerConditionStatus.False, value: TriggerConditionStatus.False},
    {label: TriggerConditionStatus.Unknown, value: TriggerConditionStatus.Unknown},
  ];

  return (
    <CardForm
      name="trigger-resource-conditions"
      title="Trigger resource condition"
      description="Fine grain the status conditions for your selected resource."
      form={form}
      initialValues={{
        timeout: currentTrigger?.conditionSpec?.timeout,
        conditions: currentTrigger?.conditionSpec?.conditions || [],
      }}
      disabled={!mayEdit}
      onConfirm={onFinish}
    >
      {isResourceConditionsListEmpty ? null : (
        <FormItem
          name="timeout"
          label={
            <FormItemLabel
              text="Delay in ms"
              tooltipMessage="Add the delay in ms the test trigger waits for conditions"
            />
          }
        >
          <InputNumber
            controls={false}
            placeholder="Delay"
            max={2 ** 31 - 1} // Int32 max value
            style={{width: '100%'}}
          />
        </FormItem>
      )}
      <Form.List name="conditions" initialValue={[]}>
        {(fields, {add, remove}) => (
          <FullWidthSpace size={16} direction="vertical">
            {!isResourceConditionsListEmpty ? (
              <FullWidthSpace direction="vertical" size={16}>
                {fields.length &&
                  fields?.map(({key, name, ...restField}) => {
                    return (
                      <FormRow key={key}>
                        <FormItem {...restField} name={[name, 'type']} rules={[requiredNoText]} flex={2}>
                          <Select
                            options={keyMap?.conditions?.map(condition => ({
                              label: condition,
                              value: condition,
                            }))}
                            placeholder="Type"
                          />
                        </FormItem>
                        <FormItem {...restField} name={[name, 'status']} rules={[requiredNoText]} flex={2}>
                          <Select options={selectOptions} placeholder="Status" />
                        </FormItem>
                        <FormItem {...restField} name={[name, 'reason']} flex={4}>
                          <Input placeholder="Reason" />
                        </FormItem>
                        <FormIconWrapper>
                          <DeleteOutlined onClick={() => remove(name)} style={{fontSize: 21}} />
                        </FormIconWrapper>
                      </FormRow>
                    );
                  })}
              </FullWidthSpace>
            ) : null}
            <FormRow justify="center">
              <Button
                $customType="secondary"
                onClick={() =>
                  add({
                    type: null,
                    status: null,
                    reason: null,
                  })
                }
              >
                Add a new condition
              </Button>
            </FormRow>
          </FullWidthSpace>
        )}
      </Form.List>
    </CardForm>
  );
};
