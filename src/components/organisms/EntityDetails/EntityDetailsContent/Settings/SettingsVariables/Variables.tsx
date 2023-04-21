import React, {useContext, useEffect, useMemo} from 'react';

import {Form} from 'antd';

import {Entity} from '@models/entity';

import {ExternalLink} from '@atoms';

import {ConfigurationCard, notificationCall, TestsVariablesList} from '@molecules';

import {displayDefaultNotificationFlow} from '@utils/notification';
import {decomposeVariables, formatVariables} from '@utils/variables';

import {Permissions, usePermission} from '@permissions/base';

import {EntityDetailsContext} from '@contexts';

import {updateRequestsMap} from '../utils';

const descriptionMap: {[key in Entity]: string} = {
  'test-suites':
    'Define environment variables which will be shared across your tests. Variables defined at a Test Suite level will override those defined at a Test level.',
  tests: 'Define environment variables which will be shared across your test.',
};

const Variables: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateEntity] = updateRequestsMap[entity]();
  const [form] = Form.useForm();

  const variables = useMemo(() => {
    return decomposeVariables(entityDetails?.executionRequest?.variables) || [];
  }, [entityDetails?.executionRequest?.variables]);

  useEffect(() => {
    form.setFieldsValue({
      'variables-list': variables,
    });
    form.resetFields();
  }, [variables]);

  const onSaveForm = (value: any) => {
    const successRecord = {
      ...entityDetails,
      executionRequest: {
        ...entityDetails.executionRequest,
        variables: formatVariables(value['variables-list']),
      },
    };

    updateEntity({
      id: entityDetails.name,
      data: successRecord,
    }).then((res: any) => {
      displayDefaultNotificationFlow(res, () => {
        notificationCall('passed', `Variables were successfully updated.`);
      });
    });
  };

  const onClickSave = () => {
    form.submit();
  };

  return (
    <Form
      form={form}
      onFinish={onSaveForm}
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
            Learn more about{' '}
            <ExternalLink href="https://kubeshop.github.io/testkube/using-testkube/tests/tests-variables/">
              Environment variables
            </ExternalLink>
          </>
        }
        onConfirm={onClickSave}
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
