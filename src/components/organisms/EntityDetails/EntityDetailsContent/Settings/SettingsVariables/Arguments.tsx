import React, {useEffect, useState} from 'react';

import {Form, Input} from 'antd';

import {ExternalLink} from '@atoms';

import {Button, FullWidthSpace, Text} from '@custom-antd';

import {Test} from '@models/test';

import {ConfigurationCard, CopyCommand, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsStore} from '@store/entityDetails';

import Colors from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {ArgumentsWrapper} from './Arguments.styled';
import {dash, doubleDash, space, stringSpace} from './utils';

type ArgumentsFormValues = {
  args: string;
};

const Arguments: React.FC = () => {
  const [form] = Form.useForm<ArgumentsFormValues>();

  const {entityDetails} = useEntityDetailsStore(x => ({entityDetails: x.entityDetails}));
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateTest] = useUpdateTestMutation();

  const details = entityDetails as Test;

  const entityArgs = details.executionRequest?.args || [];

  const [argsValue, setArgsValue] = useState(entityArgs.join(' ') || '');
  const [isPrettified, setPrettifiedState] = useState(true);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(true);

  const onSaveForm = () => {
    const values = form.getFieldsValue();
    const argVal = !values.args.length ? [] : values.args.trim().split('\n');

    const successRecord = {
      ...details,
      executionRequest: {
        ...details.executionRequest,
        args: argVal,
      },
    };

    return updateTest({
      id: entityDetails.name,
      data: successRecord,
    })
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => {
        notificationCall('passed', 'Variables were successfully updated.');
      });
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
      initialValues={{args: argsValue}}
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Arguments"
        description="Define arguments which will be passed to the test executor."
        footerText={
          <>
            Learn more about <ExternalLink href={externalLinks.arguments}>Arguments</ExternalLink>
          </>
        }
        isButtonsDisabled={isButtonsDisabled}
        onConfirm={onSaveForm}
        onCancel={() => {
          setArgsValue(entityArgs.join(' '));
          form.setFieldValue(['args'], entityArgs.join(' '));
          setIsButtonsDisabled(true);
        }}
        enabled={mayEdit}
      >
        <ArgumentsWrapper>
          <CopyCommand command={argsValue} isBordered additionalPrefix="executor-binary" />
          <FullWidthSpace size={16} direction="vertical">
            <Text className="regular middle" color={Colors.slate400}>
              Arguments passed to the executor (concat and passed directly to the executor)
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
          </FullWidthSpace>
        </ArgumentsWrapper>
      </ConfigurationCard>
    </Form>
  );
};

export default Arguments;
