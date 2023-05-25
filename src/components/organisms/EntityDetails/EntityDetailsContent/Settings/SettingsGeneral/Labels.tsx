import {useContext, useState} from 'react';

import {Form} from 'antd';

import {nanoid} from '@reduxjs/toolkit';

import {EntityDetailsContext} from '@contexts';

import {Option} from '@models/form';

import {ConfigurationCard, LabelsSelect, notificationCall} from '@molecules';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {Permissions, usePermission} from '@permissions/base';

import {displayDefaultNotificationFlow} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import {namingMap, updateRequestsMap} from '../utils';

const Labels: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateEntity] = updateRequestsMap[entity]();

  const [localLabels, setLocalLabels] = useState<readonly Option[]>([]);
  const [wasTouched, setWasTouched] = useState(false);
  const [labelsKey, setLabelsKey] = useState(nanoid());

  if (!entity || !entityDetails) {
    return null;
  }

  const entityLabels = entityDetails?.labels || {};

  const onSave = () => {
    return updateEntity({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        labels: decomposeLabels(localLabels),
      },
    })
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => {
        notificationCall('passed', `${uppercaseFirstSymbol(namingMap[entity])} was successfully updated.`);
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
        description={`Define the labels you want to add for this ${namingMap[entity]}`}
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
