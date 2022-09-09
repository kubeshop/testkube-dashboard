import React, {useContext, useState} from 'react';

import {Form, Input, Space} from 'antd';

import {Test} from '@models/test';

import {Button, Text} from '@custom-antd';

import {ConfigurationCard, CopyCommand, notificationCall} from '@molecules';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateTestMutation} from '@services/tests';

import Colors from '@styles/Colors';

import {EntityDetailsContext} from '@contexts';

import {ArgumentsWrapper, ButtonWrapper} from './Arguments.styled';
import {dash, doubleDash, space, stringSpace} from './utils';

const Arguments: React.FC = () => {
  const [form] = Form.useForm();
  const {entityDetails} = useContext(EntityDetailsContext);

  const [updateTest] = useUpdateTestMutation();

  const details = entityDetails as Test;

  const [argsValue, setArgsValue] = useState(details?.executionRequest?.args.join(' ') || '');
  const [isPrettified, setPrettifiedState] = useState(true);

  const onSaveForm = (values: any) => {
    const successRecord = {
      ...details,
      executionRequest: {
        ...details.executionRequest,
        args: values.args.trim().split('\n'),
      },
    };

    updateTest({
      id: entityDetails.name,
      data: successRecord,
    })
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', 'Variables were successfully updated.');
        });
      })
      .catch((err: any) => displayDefaultErrorNotification(err));
  };

  const onChange = () => {
    if (isPrettified) {
      setPrettifiedState(false);
    }

    const formArgs: string = form.getFieldValue('args');

    const targetArgs = formArgs
      .split(' ')
      .filter(item => {
        return item;
      })
      .join('\n')
      .split('\n')
      .filter(item => {
        return item;
      })
      .join(' ');

    setArgsValue(targetArgs);
  };

  const prettifyArgs = () => {
    const args: string = form.getFieldValue('args');

    const newArgs = args.replaceAll('--', doubleDash).replaceAll('-', dash);
    let stringArray = [];
    let isQuoteOpen = false;

    for (let i = 0; i < newArgs.length; i += 1) {
      if (newArgs[i] === '"') {
        isQuoteOpen = !isQuoteOpen;

        stringArray.push(newArgs[i]);
      } else if (newArgs[i] === ' ') {
        if (!isQuoteOpen) {
          stringArray.push(space);
        } else {
          stringArray.push(stringSpace);
        }
      } else {
        stringArray.push(newArgs[i]);
      }
    }

    form.setFieldValue(
      'args',
      stringArray
        .join('')
        .replaceAll(doubleDash, '--')
        .replaceAll(dash, '-')
        .replaceAll(stringSpace, ' ')
        .replaceAll(space, '\n')
    );

    setPrettifiedState(true);
  };

  return (
    <ConfigurationCard
      title="Arguments"
      description="Define arguments which will be passed to the test executor."
      footerText={
        <Text className="regular middle">
          Learn more about{' '}
          <a
            href="https://kubeshop.github.io/testkube/test-types/executor-soapui/#using-parameters-and-arguments-in-your-tests"
            target="_blank"
          >
            Arguments
          </a>
        </Text>
      }
      onConfirm={() => {
        form.submit();
      }}
    >
      <ArgumentsWrapper>
        <CopyCommand command={argsValue} isBordered additionalPrefix="executor-binary" />
        <Form
          form={form}
          name="general-settings-name-description"
          onChange={onChange}
          onFinish={onSaveForm}
          initialValues={{args: argsValue}}
        >
          <Space size={16} direction="vertical" style={{width: '100%'}}>
            <Text className="regular middle" color={Colors.slate400}>
              Arguments passed to the executor (concatted and passed directly to the executor)
            </Text>

            <Form.Item name="args" style={{marginBottom: 0, marginTop: 0}}>
              <Input.TextArea
                autoSize={{
                  minRows: 8,
                }}
                className="args-textarea"
                placeholder={`--flag="value value"
--flag-123=value
value
`}
              />
            </Form.Item>
            <ButtonWrapper>
              <Button onClick={prettifyArgs} disabled={isPrettified}>
                Prettify
              </Button>
            </ButtonWrapper>
          </Space>
        </Form>
      </ArgumentsWrapper>
    </ConfigurationCard>
  );
};

export default Arguments;
