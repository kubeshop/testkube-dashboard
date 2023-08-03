import {useState} from 'react';

import {Form} from 'antd';

import {nanoid} from '@reduxjs/toolkit';

import {capitalize} from 'lodash';

import {useEntityDetailsConfig} from '@constants/entityDetailsConfig/useEntityDetailsConfig';

import {Option} from '@models/form';

import {ConfigurationCard, LabelsSelect, notificationCall} from '@molecules';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {Permissions, usePermission} from '@permissions/base';

import {useEntityDetailsPick} from '@store/entityDetails';

import {displayDefaultNotificationFlow} from '@utils/notification';

const Labels: React.FC = () => {
  const {entity, details} = useEntityDetailsPick('entity', 'details');
  const {label, useUpdateEntity} = useEntityDetailsConfig(entity);
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateEntity] = useUpdateEntity();

  const [localLabels, setLocalLabels] = useState<readonly Option[]>([]);
  const [wasTouched, setWasTouched] = useState(false);
  const [labelsKey, setLabelsKey] = useState(nanoid());

  if (!entity || !details) {
    return null;
  }

  const entityLabels = details?.labels || {};

  const onSave = () => {
    return updateEntity({
      id: details.name,
      data: {
        ...details,
        labels: decomposeLabels(localLabels),
      },
    })
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => {
        notificationCall('passed', `${capitalize(label)} was successfully updated.`);
        setWasTouched(false);
      });
  };

  const onCancel = () => {
    setLabelsKey(nanoid());
    setLocalLabels(entityLabels);
    setWasTouched(false);
  };

  const onChange = (values: any) => {
    setLocalLabels(values);
    setWasTouched(true);
  };

  return (
    <Form name="labels-form">
      <ConfigurationCard
        title="Labels"
        description={`Define the labels you want to add for this ${label}`}
        isButtonsDisabled={!wasTouched}
        onConfirm={onSave}
        onCancel={onCancel}
        enabled={mayEdit}
        forceEnableButtons={wasTouched}
      >
        <LabelsSelect key={`labels_${labelsKey}`} onChange={onChange} defaultLabels={entityLabels} />
      </ConfigurationCard>
    </Form>
  );
};

export default Labels;
