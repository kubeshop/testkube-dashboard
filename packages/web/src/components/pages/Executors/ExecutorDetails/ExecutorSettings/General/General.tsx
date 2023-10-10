import {Delete} from '@molecules/CommonSettings';

import {Permissions, usePermission} from '@permissions/base';

import {useDeleteExecutorMutation} from '@services/executors';

import {useExecutorsPick} from '@store/executors';

import NameNType from './NameNType';

const General: React.FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {current} = useExecutorsPick('current');
  const [deleteExecutor] = useDeleteExecutorMutation();
  return (
    <>
      <NameNType />
      {mayDelete ? (
        <Delete
          name={current!.name}
          label="executor"
          description="The executor will be permanently deleted. All your tests will fail from here on and you need to adapt them manually. This action is irreversible and can not be undone."
          redirectUrl="/executors"
          onDelete={deleteExecutor}
        />
      ) : null}
    </>
  );
};

export default General;
