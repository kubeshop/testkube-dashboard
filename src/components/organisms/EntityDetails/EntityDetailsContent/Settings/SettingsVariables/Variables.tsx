import React, {useContext, useMemo} from 'react';

import {Form} from 'antd';

import {Entity} from '@models/entity';

import {ConfigurationCard, TestsVariablesList, notificationCall} from '@molecules';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';
import {decomposeVariables, formatVariables} from '@utils/variables';

import {useUpdateTestSuiteMutation} from '@services/testSuites';
import {useUpdateTestMutation} from '@services/tests';

import {EntityDetailsContext} from '@contexts';

const descriptionMap: {[key in Entity]: string} = {
  'test-suites':
    'Define environment variables which will be shared across your tests. Variables defined at a Test Suite level will override those defined at a Test level.',
  tests: 'Define environment variables which will be shared across your test.',
};

const Variables: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);

  const [updateTest] = useUpdateTestMutation();
  const [updateTestSuite] = useUpdateTestSuiteMutation();

  const [form] = Form.useForm();

  const variables = useMemo(() => {
    return decomposeVariables(entityDetails?.executionRequest?.variables) || [];
  }, [entityDetails?.executionRequest?.variables]);

  const updateRequestsMap: {[key in Entity]: any} = {
    'test-suites': updateTestSuite,
    tests: updateTest,
  };

  const onSaveForm = (value: any) => {
    const successRecord = {
      ...entityDetails,
      executionRequest: {
        ...entityDetails.executionRequest,
        variables: formatVariables(value['variables-list']),
      },
    };

    updateRequestsMap[entity]({
      id: entityDetails.name,
      data: successRecord,
    })
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `Variables were successfully updated.`);
        });
      })
      .catch((err: any) => displayDefaultErrorNotification(err));
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
    >
      <ConfigurationCard
        title="Variables & Secrets"
        description={descriptionMap[entity]}
        footerText={
          <>
            Learn more about{' '}
            <a href="https://kubeshop.github.io/testkube/using-testkube/tests/tests-variables/" target="_blank">
              Environment variables
            </a>
          </>
        }
        onConfirm={onClickSave}
        onCancel={() => {
          form.resetFields();
        }}
      >
        <TestsVariablesList data={variables} form={form} />
      </ConfigurationCard>
    </Form>
  );
};

export default Variables;
