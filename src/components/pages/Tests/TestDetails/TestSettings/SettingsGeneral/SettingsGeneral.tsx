import {Delete} from '@molecules/CommonSettings';

import {Labels, NameNDescription} from '@organisms/EntityDetails';

import {Permissions, usePermission} from '@permissions/base';

import {usePluginSlot} from '@plugins/hooks';

import {useDeleteTestMutation, useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import FailureHandling from './FailureHandling';
import Timeout from './Timeout';

const SettingsGeneral: React.FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {details} = useEntityDetailsPick('details');
  const deleteTestExtension = usePluginSlot('deleteTestExtension');

  return (
    <>
      <NameNDescription label="test" useUpdateEntity={useUpdateTestMutation} />
      <Labels label="test" useUpdateEntity={useUpdateTestMutation} />
      <Timeout />
      <FailureHandling />
      {mayDelete ? (
        deleteTestExtension !== undefined ? (
          deleteTestExtension
        ) : (
          <Delete
            name={details?.name!}
            label="test"
            description="The test will be permanently deleted, including its deployments analytical history. This action is irreversible and can not be undone."
            redirectUrl="/tests"
            useDeleteMutation={useDeleteTestMutation}
          />
        )
      ) : null}
    </>
  );
};

export default SettingsGeneral;
