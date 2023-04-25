import {useContext, useEffect} from 'react';

import {Form, Input} from 'antd';

import {DeleteOutlined} from '@ant-design/icons';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, updateExecutorArguments} from '@redux/reducers/executorsSlice';

import {Button} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateCustomExecutorMutation} from '@services/executors';

import {Permissions, usePermission} from '@permissions/base';

import {MainContext} from '@contexts';

import {StyledButtonsContainer, StyledLabelsSpace, SymbolWrapper, VariablesListContainer} from './Arguments.styled';

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

  const onSubmit = (values: ArgumentsFormFields) => {
    updateCustomExecutor({
      executorId: executorName,
      body: {
        ...executor,
        name: executorName,
        args: values.arguments,
      },
    }).then(res => {
      displayDefaultNotificationFlow(res, () => {
        notificationCall('passed', 'Arguments were successfully updated.');
        dispatch(updateExecutorArguments(values.arguments));
      });
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
      onFinish={onSubmit}
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Arguments for your command"
        description="Define the arguments for your command"
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <Form.List name="arguments">
          {(fields, {add, remove}) => (
            <VariablesListContainer>
              {fields.map(({key, name, ...restField}) => {
                return (
                  <StyledLabelsSpace key={key}>
                    <Form.Item {...restField} name={[name]} style={{flex: 1, marginBottom: '0'}} rules={[required]}>
                      <Input placeholder="Your argument value" />
                    </Form.Item>
                    <SymbolWrapper>
                      <DeleteOutlined onClick={() => remove(name)} style={{fontSize: 21}} />
                    </SymbolWrapper>
                  </StyledLabelsSpace>
                );
              })}
              <StyledButtonsContainer>
                <Button $customType="secondary" onClick={() => add('')}>
                  Add a new argument
                </Button>
              </StyledButtonsContainer>
            </VariablesListContainer>
          )}
        </Form.List>
      </ConfigurationCard>
    </Form>
  );
};

export default Arguments;
