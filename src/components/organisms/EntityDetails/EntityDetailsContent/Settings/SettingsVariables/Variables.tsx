import React, {useEffect, useMemo} from 'react';

import {Form} from 'antd';

import {ExternalLink} from '@atoms';

import {Entity} from '@models/entity';
import {VariableInForm} from '@models/variable';

import {ConfigurationCard, TestsVariablesList, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useEntityDetailsPick} from '@store/entityDetails';

import {externalLinks} from '@utils/externalLinks';
import {displayDefaultNotificationFlow} from '@utils/notification';
import {decomposeVariables, formatVariables} from '@utils/variables';

import {updateRequestsMap} from '../utils';

const descriptionMap: Record<Entity, string> = {
  'test-suites':
    'Define environment variables which will be shared across your tests. Variables defined at a Test Suite level will override those defined at a Test level.',
  tests: 'Define environment variables which will be shared across your test.',
};

type VariablesFormValues = {
  'variables-list': VariableInForm[];
};

const Variables: React.FC = () => {
  const {entity, details} = useEntityDetailsPick('entity', 'details');
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateEntity] = updateRequestsMap[entity]();
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
      .then(res => displayDefaultNotificationFlow(res))
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
        description={descriptionMap[entity]}
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
