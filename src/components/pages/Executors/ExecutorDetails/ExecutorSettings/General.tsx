import {FC} from 'react';

import {Delete} from '@molecules/CommonSettings/Delete';

import {Permissions, usePermission} from '@permissions/base';

import {useDeleteExecutorMutation} from '@services/executors';

import {useExecutorsPick} from '@store/executors';

import {NameNType} from './General/NameNType';

export const General: FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {current} = useExecutorsPick('current');
  return (
    <>
      <NameNType />
      {mayDelete ? (
        <Delete
          name={current!.name}
          label="executor"
          description="The executor will be permanently deleted. All your tests will fail from here on and you need to adapt them manually. This action is irreversible and can not be undone."
          redirectUrl="/executors"
          useDeleteMutation={useDeleteExecutorMutation}
        />
      ) : null}
    </>
  );
};
