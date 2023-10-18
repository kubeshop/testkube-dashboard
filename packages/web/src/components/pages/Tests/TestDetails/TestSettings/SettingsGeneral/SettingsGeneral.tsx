import {useLegacySlotFirst} from '@testkube/web/src/legacyHooks';

import {Delete} from '@molecules/CommonSettings';

import {Labels, NameNDescription} from '@organisms/EntityDetails';

import {Permissions, usePermission} from '@permissions/base';

import {useDeleteTestMutation, useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import FailureHandling from './FailureHandling';
import Timeout from './Timeout';

const SettingsGeneral: React.FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {details} = useEntityDetailsPick('details');
  const deleteTestExtension = useLegacySlotFirst('deleteTestExtension');
  const [deleteTest] = useDeleteTestMutation();

  return (
    <>
      <NameNDescription label="test" useUpdateEntity={useUpdateTestMutation} readOnly={details.readOnly} />
      <Labels label="test" useUpdateEntity={useUpdateTestMutation} readOnly={details.readOnly} />
      <Timeout readOnly={details.readOnly} />
      <FailureHandling readOnly={details.readOnly} />
      {mayDelete ? (
        deleteTestExtension !== undefined ? (
          deleteTestExtension
        ) : (
          <Delete
            name={details?.name!}
            label="test"
            description="The test will be permanently deleted, including its deployments analytical history. This action is irreversible and can not be undone."
            redirectUrl="/tests"
            onDelete={deleteTest}
          />
        )
      ) : null}
    </>
  );
};

export default SettingsGeneral;
