/* eslint-disable unused-imports/no-unused-imports-ts */
import {useContext, useEffect} from 'react';

import {Form, Input} from 'antd';

import {DeleteOutlined} from '@ant-design/icons';

import {Executor} from '@models/executors';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, updateExecutorArguments} from '@redux/reducers/executorsSlice';

import {Button, Text} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {required} from '@utils/form';
import {displayDefaultErrorNotification} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import {useUpdateCustomExecutorMutation} from '@services/executors';

import {MainContext} from '@contexts';

import {StyledButtonsContainer, StyledLablesSpace, SymbolWrapper, VariablesListContainer} from './Arguments.styled';

type ArgumentsFormFields = {
  arguments: string[];
};

const Arguments: React.FC = () => {
  const {executor, name: executorName} = useAppSelector(selectCurrentExecutor) as Executor;
  const {args} = executor;

  const {dispatch} = useContext(MainContext);

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
    })
      .then(() => {
        notificationCall('passed', 'Arguments were successfully updated.');
        dispatch(updateExecutorArguments(values.arguments));
      })
      .catch(err => {
        displayDefaultErrorNotification(err);
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
        footerText={
          <Text className="regular middle">
            Learn more about{' '}
            <a
              href="https://kubeshop.github.io/testkube/using-testkube/test-suites/testsuites-creating/"
              target="_blank"
            >
              arguments for commands
            </a>
          </Text>
        }
      >
        <Form.List name="arguments">
          {(fields, {add, remove}) => (
            <VariablesListContainer>
              {fields.map(({key, name, ...restField}) => {
                return (
                  <StyledLablesSpace key={key}>
                    <Form.Item {...restField} name={[name]} style={{flex: 1, marginBottom: '0'}} rules={[required]}>
                      <Input placeholder="Your argument value" />
                    </Form.Item>
                    <SymbolWrapper>
                      <DeleteOutlined onClick={() => remove(name)} style={{fontSize: 21}} />
                    </SymbolWrapper>
                  </StyledLablesSpace>
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
