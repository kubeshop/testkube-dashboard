import {DeleteOutlined} from '@ant-design/icons';
import {Form, Input} from 'antd';

import {Button, FormIconWrapper, FormItem, FormRow, FullWidthSpace} from '@custom-antd';

import {notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateCustomExecutorMutation} from '@services/executors';

import {useExecutorsPick} from '@store/executors';

import {required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {StyledButtonsContainer} from './Arguments.styled';

type ArgumentsFormFields = {
  arguments: string[];
};

const Arguments: React.FC = () => {
  const {current} = useExecutorsPick('current');

  const mayEdit = usePermission(Permissions.editEntity);

  const [updateCustomExecutor] = useUpdateCustomExecutorMutation();

  const [form] = Form.useForm<ArgumentsFormFields>();

  const onSubmit = () => {
    const values = form.getFieldsValue();

    return updateCustomExecutor({
      executorId: current!.name,
      body: {
        ...current!.executor,
        name: current!.name,
        args: values.arguments,
      },
    })
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', 'Arguments were successfully updated.'));
  };

  return (
    <CardForm
      form={form}
      initialValues={{arguments: current!.executor.args}}
      name="executor-settings-arguments-list"
      title="Arguments for your command"
      description="Define the arguments for your command"
      disabled={!mayEdit}
      onConfirm={onSubmit}
    >
      <Form.List name="arguments">
        {(fields, {add, remove}) => (
          <FullWidthSpace size={20} direction="vertical">
            {fields.map(({key, name, ...restField}) => {
              return (
                <FormRow key={key}>
                  <FormItem {...restField} name={[name]} rules={[required]}>
                    <Input placeholder="Your argument value" />
                  </FormItem>
                  <FormIconWrapper>
                    <DeleteOutlined
                      onClick={() => remove(name)}
                      style={{fontSize: 21}}
                      data-testid="delete-argument-button"
                    />
                  </FormIconWrapper>
                </FormRow>
              );
            })}
            <StyledButtonsContainer>
              <Button $customType="secondary" onClick={() => add('')} data-testid="add-argument-button">
                Add a new argument
              </Button>
            </StyledButtonsContainer>
          </FullWidthSpace>
        )}
      </Form.List>
    </CardForm>
  );
};

export default Arguments;
