import React, {useEffect, useMemo} from 'react';

import {Form, Input, Select} from 'antd';

import {ExternalLink} from '@atoms';

import {Button, FormItem, FormItemLabel, FullWidthSpace, Text} from '@custom-antd';

import {useLastCallback} from '@hooks/useLastCallback';

import {ExecutionArgsModeEnum} from '@models/execution';
import {Test} from '@models/test';

import {CopyCommand, notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useGetExecutorDetailsQuery} from '@services/executors';
import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import Colors from '@styles/Colors';

import {escapeArguments} from '@utils/escapeArguments';
import {externalLinks} from '@utils/externalLinks';
import {displayDefaultNotificationFlow} from '@utils/notification';
import {prettifyArguments} from '@utils/prettifyArguments';

import {ArgumentsWrapper} from './Arguments.styled';

type ArgumentsFormValues = {
  args: string;
  argsMode: ExecutionArgsModeEnum;
};

interface ArgumentsProps {
  readOnly?: boolean;
}

const Arguments: React.FC<ArgumentsProps> = ({readOnly}) => {
  const [form] = Form.useForm<ArgumentsFormValues>();

  const {details} = useEntityDetailsPick('details') as {details: Test};
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateTest] = useUpdateTestMutation();
  const executorName = details.labels ? details.labels['executor'] : '';

  const {data: executorDetails = ''} = useGetExecutorDetailsQuery(executorName, {
    skip: executorName === '',
  });

  const entityArgs = details.executionRequest?.args || [];
  const initialArgs = useMemo(() => escapeArguments(entityArgs)?.join('\n') || '', [entityArgs]);
  const initialArgsMode = useMemo(
    () => details.executionRequest?.args_mode || 'append',
    [details.executionRequest?.args_mode]
  );

  const currentArgs = Form.useWatch('args', form) || '';
  const argsMode = Form.useWatch('argsMode', form) || 'append';

  const prettifiedArgs = useMemo(() => prettifyArguments(currentArgs), [currentArgs]);
  const currentArgsInline = useMemo(() => prettifiedArgs.replace(/\n+/g, ' '), [prettifiedArgs]);

  const isPrettified = currentArgs === prettifiedArgs;

  const onSaveForm = async () => {
    const argVal = currentArgs?.trim().split('\n').filter(Boolean) || [];

    // Reset the form when there is no actual change
    if (argVal.join('\n') === initialArgs && argsMode === initialArgsMode) {
      form.resetFields();
    }

    const successRecord = {
      ...details,
      executionRequest: {
        ...details.executionRequest,
        args: argVal,
        args_mode: argsMode,
      },
    };

    const res = await updateTest({
      id: details.name,
      data: successRecord,
    });

    displayDefaultNotificationFlow(res);
    notificationCall('passed', 'Variables were successfully updated.');
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
      disabled={!mayEdit}
      readOnly={readOnly}
      initialValues={{args: initialArgs, argsMode: initialArgsMode}}
      onConfirm={onSaveForm}
      onCancel={onCancel}
    >
      <ArgumentsWrapper>
        <FormItem
          name="argsMode"
          key="argsMode"
          label={
            <FormItemLabel
              text="Mode"
              tooltipMessage="Choose between appending arguments to the executor or replacing them"
            />
          }
        >
          <Select
            options={[
              {
                label: 'Append',
                value: 'append',
              },
              {
                label: 'Override',
                value: 'override',
              },
            ]}
          />
        </FormItem>
        <FullWidthSpace size={16} direction="vertical">
          <CopyCommand
            command={currentArgsInline}
            isBordered
            additionalPrefix={`executor-binary ${
              argsMode === 'append' ? executorDetails?.executor.args.join(' ') : ''
            }`}
          />

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
