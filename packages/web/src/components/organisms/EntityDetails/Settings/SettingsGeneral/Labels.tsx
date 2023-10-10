import {FC} from 'react';

import {Form} from 'antd';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import {capitalize} from 'lodash';

import {FormItem} from '@custom-antd';

import {LabelsSelect, notificationCall} from '@molecules';
import {composeLabels, decomposeLabels} from '@molecules/LabelsSelect/utils';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useEntityDetailsPick} from '@store/entityDetails';

import {displayDefaultNotificationFlow} from '@utils/notification';

interface LabelsProps {
  label: string;
  readOnly?: boolean;
  useUpdateEntity: UseMutation<MutationDefinition<any, any, any, any, any>>;
}

const Labels: FC<LabelsProps> = ({label, useUpdateEntity, readOnly}) => {
  const [form] = Form.useForm();
  const {details} = useEntityDetailsPick('details');
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateEntity] = useUpdateEntity();

  if (!details) {
    return null;
  }

  const onSave = () => {
    const labels = form.getFieldValue('labels');
    return updateEntity({
      id: details.name,
      data: {...details, labels: decomposeLabels(labels)},
    })
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', `${capitalize(label)} was successfully updated.`));
  };

  // TODO: Disable LabelsSelect when it is disabled
  return (
    <CardForm
      name="labels-form"
      title="Labels"
      description={`Define the labels you want to add for this ${label}`}
      form={form}
      initialValues={{labels: composeLabels(details?.labels || {})}}
      disabled={!mayEdit}
      readOnly={readOnly}
      onConfirm={onSave}
    >
      <FormItem name="labels">
        <LabelsSelect disabled={!mayEdit || readOnly} />
      </FormItem>
    </CardForm>
  );
};

export default Labels;
