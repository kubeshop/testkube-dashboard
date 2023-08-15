import {Delete} from '@molecules/CommonSettings';

import {Permissions, usePermission} from '@permissions/base';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor} from '@redux/reducers/executorsSlice';

import {useDeleteExecutorMutation} from '@services/executors';

import NameNType from './NameNType';

const General: React.FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);
  const executor = useAppSelector(selectCurrentExecutor);

  return (
    <>
      <NameNType />
      {mayDelete ? (
        <Delete
          name={executor?.name!}
          label="executor"
          description="The executor will be permanently deleted. All your tests will fail from here on and you need to adapt them manually. This action is irreversible and can not be undone."
          redirectUrl="/executors"
          useDeleteMutation={useDeleteExecutorMutation}
        />
      ) : null}
    </>
  );
};

export default General;
