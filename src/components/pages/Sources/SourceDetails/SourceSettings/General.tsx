import {FC} from 'react';

import {Delete} from '@molecules/CommonSettings/Delete';

import {Permissions, usePermission} from '@permissions/base';

import {useDeleteSourceMutation} from '@services/sources';

import {useSourcesPick} from '@store/sources';

import {Authentication} from './General/Authentication';
import {NameNUrl as NameNType} from './General/NameNUrl';

export const General: FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {current} = useSourcesPick('current');

  return (
    <>
      <NameNType />
      <Authentication />
      {mayDelete ? (
        <Delete
          name={current!.name}
          label="source"
          description="This source will be permanently deleted. All your tests linked to this source will fail from here on and you need to adapt them manually. This action is irreversible and can not be undone."
          redirectUrl="/sources"
          useDeleteMutation={useDeleteSourceMutation}
        />
      ) : null}
    </>
  );
};
