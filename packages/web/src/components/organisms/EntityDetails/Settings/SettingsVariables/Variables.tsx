import React, {useEffect, useMemo} from 'react';

import {Form} from 'antd';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import {ExternalLink} from '@atoms';

import {VariableInForm} from '@models/variable';

import {TestsVariablesList, notificationCall} from '@molecules';

import {CardForm} from '@organisms';

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
  readOnly?: boolean;
  useUpdateEntity: UseMutation<MutationDefinition<any, any, any, any, any>>;
}

const Variables: React.FC<VariablesProps> = ({description, readOnly, useUpdateEntity}) => {
  const {details} = useEntityDetailsPick('details');
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

  const onFieldsChange = (_: any) => {
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
  };

  const footer = (
    <>
      Learn more about <ExternalLink href={externalLinks.variables}>Environment variables</ExternalLink>
    </>
  );

  return (
    <CardForm
      name="variables-form"
      title="Variables & Secrets"
      description={description}
      footer={footer}
      form={form}
      disabled={!mayEdit}
      readOnly={readOnly}
      onFieldsChange={onFieldsChange}
      onConfirm={onSaveForm}
    >
      <TestsVariablesList data={variables} form={form} />
    </CardForm>
  );
};

export default Variables;
