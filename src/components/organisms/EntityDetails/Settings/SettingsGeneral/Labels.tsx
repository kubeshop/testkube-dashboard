import {useState} from 'react';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import {capitalize} from 'lodash';

import {Option} from '@models/form';

import {LabelsSelect, notificationCall} from '@molecules';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useEntityDetailsPick} from '@store/entityDetails';

import {displayDefaultNotificationFlow} from '@utils/notification';

interface LabelsProps {
  label: string;
  useUpdateEntity: UseMutation<MutationDefinition<any, any, any, any, any>>;
}

const Labels: React.FC<LabelsProps> = ({label, useUpdateEntity}) => {
  const {details} = useEntityDetailsPick('details');
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateEntity] = useUpdateEntity();

  const [localLabels, setLocalLabels] = useState<readonly Option[]>([]);
  const [wasTouched, setWasTouched] = useState(false);

  if (!details) {
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
      .then(displayDefaultNotificationFlow)
      .then(() => {
        notificationCall('passed', `${capitalize(label)} was successfully updated.`);
        setWasTouched(false);
      });
  };

  const onCancel = () => {
    setLocalLabels(entityLabels);
    setWasTouched(false);
  };

  const onChange = (values: any) => {
    setLocalLabels(values);
    setWasTouched(true);
  };

  return (
    <CardForm
      name="labels-form"
      title="Labels"
      description={`Define the labels you want to add for this ${label}`}
      disabled={!mayEdit}
      wasTouched={wasTouched}
      onConfirm={onSave}
      onCancel={onCancel}
    >
      <LabelsSelect onChange={onChange} defaultLabels={entityLabels} />
    </CardForm>
  );
};

export default Labels;
