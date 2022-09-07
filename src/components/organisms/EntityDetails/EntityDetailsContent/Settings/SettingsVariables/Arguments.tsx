/* eslint-disable unused-imports/no-unused-imports-ts */
import React, {useContext, useEffect, useState} from 'react';

import {Form, Input, Space} from 'antd';

import styled from 'styled-components';

import {Test} from '@models/test';

import {Button, Text} from '@custom-antd';

import {ConfigurationCard, CopyCommand, notificationCall} from '@molecules';

import {required} from '@utils/form';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateTestMutation} from '@services/tests';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

import {EntityDetailsContext} from '@contexts';

const dash = 'DASH_TBR';
const doubleDash = 'DOUBLE_DASH_TBR';
const space = 'SPACE_TBR';
const stringSpace = 'STRING_SPACE';

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

  const onClickSave = () => {
    form.submit();
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
            href="https://kubeshop.github.io/testkube/executor-soapui/#using-parameters-and-arguments-in-your-tests"
            target="_blank"
          >
            Arguments
          </a>
        </Text>
      }
      onConfirm={onClickSave}
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
            <div style={{textAlign: 'right'}}>
              <Button onClick={prettifyArgs} disabled={isPrettified}>
                Prettify
              </Button>
            </div>
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
          </Space>
        </Form>
      </ArgumentsWrapper>
    </ConfigurationCard>
  );
};

const ArgumentsWrapper = styled.div`
  .args-textarea {
    color: ${Colors.slate50};

    font-family: ${Fonts.robotoMono};

    resize: none;
  }
`;

export default Arguments;
