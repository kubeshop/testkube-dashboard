import React, {useEffect, useMemo} from 'react';

import {Form, Input} from 'antd';

import {ExternalLink} from '@atoms';

import {Button, FullWidthSpace, Text} from '@custom-antd';

import {useLastCallback} from '@hooks/useLastCallback';

import {Test} from '@models/test';

import {CopyCommand, notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import Colors from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';
import {displayDefaultNotificationFlow} from '@utils/notification';
import {prettifyArguments} from '@utils/prettifyArguments';

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
  const initialArgs = useMemo(() => entityArgs?.join('\n') || '', [entityArgs]);

  const currentArgs = Form.useWatch('args', form) || '';
  const currentArgsInline = currentArgs.replace(/\s+/g, ' ').trim();
  const isPrettified = useMemo(() => currentArgs === prettifyArguments(currentArgs), [currentArgs]);

  const onSaveForm = () => {
    const values = form.getFieldsValue();
    const argVal = values.args?.trim().split('\n').filter(Boolean) || [];

    // Reset the form when there is no actual change
    if (argVal.join('\n') === initialArgs) {
      form.resetFields();
    }

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

  const onPrettify = useLastCallback(() => form.setFieldValue('args', prettifyArguments(currentArgs)));
  const onCancel = useLastCallback(() => form.resetFields());

  useEffect(() => form.resetFields(), [details]);

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
      initialValues={{args: initialArgs}}
      disabled={!mayEdit}
      readOnly={readOnly}
      onConfirm={onSaveForm}
      onCancel={onCancel}
    >
      <ArgumentsWrapper>
        <CopyCommand command={currentArgsInline} isBordered additionalPrefix="executor-binary" />
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
          <Button onClick={onPrettify} $customType="secondary" disabled={isPrettified || readOnly}>
            Prettify
          </Button>
        </FullWidthSpace>
      </ArgumentsWrapper>
    </CardForm>
  );
};

export default Arguments;
