import {FC} from 'react';

import {Delete} from '@molecules/CommonSettings/Delete';

import {Permissions, usePermission} from '@permissions/base';

import {useDeleteTriggerMutation} from '@services/triggers';

import {useTriggersPick} from '@store/triggers';

import {Name} from './General/Name';

export const General: FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {current} = useTriggersPick('current');

  return (
    <>
      <Name />
      {mayDelete ? (
        <Delete
          name={current?.name!}
          label="trigger"
          description="This trigger will be permanently deleted. All your automation linked to this trigger will fail from here on and you need to adapt them manually. This action is irreversible and can not be undone."
          redirectUrl="/triggers"
          useDeleteMutation={useDeleteTriggerMutation}
        />
      ) : null}
    </>
  );
};
