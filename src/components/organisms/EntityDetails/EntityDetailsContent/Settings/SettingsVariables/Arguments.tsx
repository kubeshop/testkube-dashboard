import React, {useContext, useEffect, useState} from 'react';

import {Form, Input, Space} from 'antd';

import {Test} from '@models/test';

import {ExternalLink} from '@atoms';

import {Button, Text} from '@custom-antd';

import {ConfigurationCard, CopyCommand, notificationCall} from '@molecules';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateTestMutation} from '@services/tests';

import Colors from '@styles/Colors';

import {Permissions, usePermission} from '@permissions/base';

import {EntityDetailsContext} from '@contexts';

import {ArgumentsWrapper} from './Arguments.styled';
import {dash, doubleDash, space, stringSpace} from './utils';

const Arguments: React.FC = () => {
  const [form] = Form.useForm();
  const {entityDetails} = useContext(EntityDetailsContext);
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateTest] = useUpdateTestMutation();

  const details = entityDetails as Test;

  const entityArgs = details.executionRequest?.args || [];

  const [argsValue, setArgsValue] = useState(entityArgs.join(' ') || '');
  const [isPrettified, setPrettifiedState] = useState(true);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(true);

  const onSaveForm = (values: {args: string}) => {
    const argVal = !values.args.length ? [] : values.args.trim().split('\n');

    const successRecord = {
      ...details,
      executionRequest: {
        ...details.executionRequest,
        args: argVal,
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
    setIsButtonsDisabled(false);
  };

  const prettifyArgs = () => {
    const args = form.getFieldValue('args');

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

  useEffect(() => {
    prettifyArgs();
  }, []);

  return (
    <Form
      form={form}
      name="general-settings-name-description"
      onChange={onChange}
      onFinish={onSaveForm}
      initialValues={{args: argsValue}}
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Arguments"
        description="Define arguments which will be passed to the test executor."
        footerText={
          <>
            Learn more about{' '}
            <ExternalLink href="https://kubeshop.github.io/testkube/test-types/executor-soapui/#using-parameters-and-arguments-in-your-tests">
              Arguments
            </ExternalLink>
          </>
        }
        isButtonsDisabled={isButtonsDisabled}
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          setArgsValue(entityArgs.join(' '));
          form.setFieldValue(['args'], entityArgs.join(' '));
          setIsButtonsDisabled(true);
        }}
        enabled={mayEdit}
      >
        <ArgumentsWrapper>
          <CopyCommand command={argsValue} isBordered additionalPrefix="executor-binary" />
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
            <Button onClick={prettifyArgs} $customType="secondary" disabled={isPrettified}>
              Prettify
            </Button>
          </Space>
        </ArgumentsWrapper>
      </ConfigurationCard>
    </Form>
  );
};

export default Arguments;
