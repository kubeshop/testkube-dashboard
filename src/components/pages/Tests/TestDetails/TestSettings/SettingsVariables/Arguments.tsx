import React, {useEffect, useState} from 'react';

import {Form, Input} from 'antd';

import {ExternalLink} from '@atoms';

import {Button, FullWidthSpace, Text} from '@custom-antd';

import {Test} from '@models/test';

import {CopyCommand, notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import Colors from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {ArgumentsWrapper} from './Arguments.styled';

type ArgumentsFormValues = {
  args: string;
};

interface ArgumentsProps {
  readOnly?: boolean;
}

const Arguments: React.FC<ArgumentsProps> = ({readOnly}) => {
  const [form] = Form.useForm<ArgumentsFormValues>();

  const {details} = useEntityDetailsPick('details') as {details: Test};
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateTest] = useUpdateTestMutation();

  const entityArgs = details.executionRequest?.args || [];
  const initialArgValue = entityArgs.join(' ') || '';

  const [argsValue, setArgsValue] = useState(initialArgValue);
  const [isPrettified, setPrettifiedState] = useState(true);

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
      id: details.name,
      data: successRecord,
    })
      .then(displayDefaultNotificationFlow)
      .then(() => {
        notificationCall('passed', 'Variables were successfully updated.');
      });
  };

  const onChange = () => {
    if (isPrettified) {
      setPrettifiedState(false);
    }
    const args = (form.getFieldValue('args') as string).replace(/\s+/g, ' ').trim();
    setArgsValue(args);
  };

  const onCancel = () => {
    setArgsValue(entityArgs.join(' '));
    form.setFieldValue(['args'], entityArgs.join(' '));
  };

  const prettifyArgs = () => {
    const args = form
      .getFieldValue('args')
      .replace(/("(\\"|[^"])+")|('(\\'|[^'])+')|\s/g, (_: string, str1: string, str2: string) => str1 || str2 || '\n')
      .replace(/\n{2,}/g, '\n')
      .trim();
    form.setFieldValue('args', args);
    setPrettifiedState(true);
  };

  useEffect(() => {
    prettifyArgs();
  }, []);

  const footer = (
    <>
      Learn more about <ExternalLink href={externalLinks.arguments}>Arguments</ExternalLink>
    </>
  );

  return (
    <CardForm
      name="general-settings-name-description"
      title="Arguments"
      description="Define arguments which will be passed to the test executor."
      footer={footer}
      form={form}
      initialValues={{args: initialArgValue}}
      disabled={!mayEdit}
      readOnly={readOnly}
      onFieldsChange={onChange}
      onConfirm={onSaveForm}
      onCancel={onCancel}
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
          <Button onClick={prettifyArgs} $customType="secondary" disabled={isPrettified || readOnly}>
            Prettify
          </Button>
        </FullWidthSpace>
      </ArgumentsWrapper>
    </CardForm>
  );
};

export default Arguments;
