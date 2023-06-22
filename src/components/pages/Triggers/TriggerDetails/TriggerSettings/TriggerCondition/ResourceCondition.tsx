import {DeleteOutlined} from '@ant-design/icons';
import {Form, Input, InputNumber, Select} from 'antd';

import {Button, FormItem, FormRow, FullWidthSpace} from '@custom-antd';
import {SymbolWrapper} from '@custom-antd/Form/Form.styled';
import FormItemLabel from '@custom-antd/Form/FormItem/FormItemLabel';

import {TestTrigger, TriggerConditionStatus} from '@models/triggers';

import {ConfigurationCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTriggerByIdMutation} from '@services/triggers';

import {useStore} from '@store';

import {requiredNoText} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

const ResourceCondition: React.FC = () => {
  const {currentTrigger, setCurrentTrigger, triggersKeyMap} = useStore(state => ({
    currentTrigger: state.currentTrigger!,
    setCurrentTrigger: state.setCurrentTrigger,
    triggersKeyMap: state.triggersKeyMap!,
  }));

  const mayEdit = usePermission(Permissions.editEntity);

  const [updateTrigger] = useUpdateTriggerByIdMutation();

  const [form] = Form.useForm<TestTrigger['conditionSpec']>();
  const resourceConditionValue = Form.useWatch('conditions', form);

  const onFinish = () => {
    const {timeout, conditions} = form.getFieldsValue();

    const body = {
      ...currentTrigger,
      conditionSpec: {
        conditions,
        ...(timeout && {timeout}),
      },
    };

    return updateTrigger(body)
      .then(res => displayDefaultNotificationFlow(res))
      .then(res => {
        if (res && 'data' in res) {
          notificationCall('passed', 'Trigger was successfully updated.');
          setCurrentTrigger(res.data);
          form.setFieldsValue({
            timeout: res.data.conditionSpec?.timeout,
            conditions: res.data.conditionSpec?.conditions || [],
          });
        }
      });
  };

  const isResourceConditionsListEmpty = resourceConditionValue && !resourceConditionValue.length;

  return (
    <Form
      form={form}
      name="trigger-resource-conditions"
      initialValues={{
        timeout: currentTrigger?.conditionSpec?.timeout,
        conditions: currentTrigger?.conditionSpec?.conditions || [],
      }}
      layout="vertical"
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Trigger resource condition"
        description="Fine grain the status conditions for your selected resource."
        onConfirm={onFinish}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <FullWidthSpace size={32} direction="vertical">
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
                    {fields?.map(({key, name, ...restField}) => {
                      return (
                        <FormRow key={key}>
                          <FormItem {...restField} name={[name, 'type']} rules={[requiredNoText]} flex={2}>
                            <Select
                              options={triggersKeyMap.conditions.map(condition => ({
                                label: condition,
                                value: condition,
                              }))}
                              placeholder="Type"
                            />
                          </FormItem>
                          <FormItem {...restField} name={[name, 'status']} rules={[requiredNoText]} flex={2}>
                            <Select
                              options={[
                                {label: TriggerConditionStatus.True, value: TriggerConditionStatus.True},
                                {label: TriggerConditionStatus.False, value: TriggerConditionStatus.False},
                                {label: TriggerConditionStatus.Unknown, value: TriggerConditionStatus.Unknown},
                              ]}
                              placeholder="Status"
                            />
                          </FormItem>
                          <FormItem {...restField} name={[name, 'reason']} flex={4}>
                            <Input placeholder="Reason" />
                          </FormItem>
                          <SymbolWrapper>
                            <DeleteOutlined onClick={() => remove(name)} style={{fontSize: 21}} />
                          </SymbolWrapper>
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
        </FullWidthSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default ResourceCondition;
