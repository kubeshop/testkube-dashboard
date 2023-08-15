import {Delete} from '@molecules/CommonSettings';

import {Permissions, usePermission} from '@permissions/base';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource} from '@redux/reducers/sourcesSlice';

import {useDeleteSourceMutation} from '@services/sources';

import Authentication from './Authentication';
import NameNType from './NameNUrl';

const General: React.FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);
  const source = useAppSelector(selectCurrentSource);

  return (
    <>
      <NameNType />
      <Authentication />
      {mayDelete ? (
        <Delete
          name={source?.name!}
          label="source"
          description="This source will be permanently deleted. All your tests linked to this source will fail from here on and you need to adapt them manually. This action is irreversible and can not be undone."
          redirectUrl="/sources"
          useDeleteMutation={useDeleteSourceMutation}
        />
      ) : null}
    </>
  );
};

export default General;
