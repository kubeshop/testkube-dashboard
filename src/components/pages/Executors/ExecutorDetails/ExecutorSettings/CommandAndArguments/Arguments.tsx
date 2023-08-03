import {useContext, useEffect} from 'react';

import {DeleteOutlined} from '@ant-design/icons';
import {Form, Input} from 'antd';

import {MainContext} from '@contexts';

import {Button, FormIconWrapper, FormItem, FormRow, FullWidthSpace} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, updateCurrentExecutorData} from '@redux/reducers/executorsSlice';

import {useUpdateCustomExecutorMutation} from '@services/executors';

import {required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {StyledButtonsContainer} from './Arguments.styled';

type ArgumentsFormFields = {
  arguments: string[];
};

const Arguments: React.FC = () => {
  const {executor, name: executorName} = useAppSelector(selectCurrentExecutor);
  const {args} = executor;

  const {dispatch} = useContext(MainContext);
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateCustomExecutor] = useUpdateCustomExecutorMutation();

  const [form] = Form.useForm<ArgumentsFormFields>();

  const onSubmit = () => {
    const values = form.getFieldsValue();

    return updateCustomExecutor({
      executorId: executorName,
      body: {
        ...executor,
        name: executorName,
        args: values.arguments,
      },
    })
      .then(displayDefaultNotificationFlow)
      .then(() => {
        notificationCall('passed', 'Arguments were successfully updated.');
        dispatch(updateCurrentExecutorData({args: values.arguments}));
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      arguments: args,
    });
  }, [args]);

  return (
    <Form
      form={form}
      name="executor-settings-arguments-list"
      initialValues={{arguments: args}}
      layout="vertical"
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Arguments for your command"
        description="Define the arguments for your command"
        onConfirm={onSubmit}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
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
                      <DeleteOutlined onClick={() => remove(name)} style={{fontSize: 21}} />
                    </FormIconWrapper>
                  </FormRow>
                );
              })}
              <StyledButtonsContainer>
                <Button $customType="secondary" onClick={() => add('')}>
                  Add a new argument
                </Button>
              </StyledButtonsContainer>
            </FullWidthSpace>
          )}
        </Form.List>
      </ConfigurationCard>
    </Form>
  );
};

export default Arguments;
