import React, {useEffect, useMemo} from 'react';

import {Form} from 'antd';

import {ExternalLink} from '@atoms';

import {useEntityDetailsConfig} from '@constants/entityDetailsConfig/useEntityDetailsConfig';

import {VariableInForm} from '@models/variable';

import {ConfigurationCard, TestsVariablesList, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useEntityDetailsPick} from '@store/entityDetails';

import {externalLinks} from '@utils/externalLinks';
import {displayDefaultNotificationFlow} from '@utils/notification';
import {decomposeVariables, formatVariables} from '@utils/variables';

type VariablesFormValues = {
  'variables-list': VariableInForm[];
};

interface VariablesProps {
  description: string;
}

const Variables: React.FC<VariablesProps> = ({description}) => {
  const {entity, details} = useEntityDetailsPick('entity', 'details');
  const {useUpdateEntity} = useEntityDetailsConfig(entity);
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateEntity] = useUpdateEntity();
  const [form] = Form.useForm<VariablesFormValues>();

  const variables = useMemo(() => {
    return decomposeVariables(details?.executionRequest?.variables);
  }, [details?.executionRequest?.variables]);

  useEffect(() => {
    form.setFieldsValue({
      'variables-list': variables,
    });
    form.resetFields();
  }, [variables]);

  const onSaveForm = () => {
    const value = form.getFieldsValue();
    const successRecord = {
      ...details,
      executionRequest: {
        ...details.executionRequest,
        variables: formatVariables(value['variables-list']),
      },
    };

    return updateEntity({
      id: details.name,
      data: successRecord,
    })
      .then(displayDefaultNotificationFlow)
      .then(() => {
        notificationCall('passed', `Variables were successfully updated.`);
      });
  };

  return (
    <Form
      form={form}
      onFieldsChange={(_: any) => {
        if (_[0]) {
          const action = _[0];

          const actionValue = action.value;

          if (!Array.isArray(actionValue)) {
            const actionFieldIndex = action.name[1];
            const isTypeChanged = action.name[2] === 'type';
            const neededFieldValue = form.getFieldValue('variables-list')[actionFieldIndex];

            if (isTypeChanged) {
              try {
                if (actionValue === 'secretRef') {
                  delete neededFieldValue.value;
                } else {
                  delete neededFieldValue.secretRefName;
                  delete neededFieldValue.secretRefKey;
                }
              } catch (err) {
                // eslint-disable-next-line no-console
                console.log('err: ', err);
              }
            }
          }
        }
      }}
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Variables & Secrets"
        description={description}
        footerText={
          <>
            Learn more about <ExternalLink href={externalLinks.variables}>Environment variables</ExternalLink>
          </>
        }
        onConfirm={onSaveForm}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <TestsVariablesList data={variables} form={form} />
      </ConfigurationCard>
    </Form>
  );
};

export default Variables;
