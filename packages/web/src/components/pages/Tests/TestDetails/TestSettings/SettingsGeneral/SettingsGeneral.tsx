import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {Delete} from '@molecules/CommonSettings';

import {Labels, NameNDescription} from '@organisms/EntityDetails';

import {Permissions, usePermission} from '@permissions/base';

import {useTestsSlot} from '@plugins/tests-and-test-suites/hooks';

import {useDeleteTestMutation, useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import FailureHandling from './FailureHandling';
import Timeout from './Timeout';

const SettingsGeneral: React.FC = () => {
  const isAgentAvailable = useSystemAccess(SystemAccess.agent);
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {details} = useEntityDetailsPick('details');
  // TODO: Instead, use always the slot, and register current <Delete /> as fallback
  const deleteTestExtension = useTestsSlot('deleteTestExtension');
  const [deleteTest] = useDeleteTestMutation();
  const isReadOnly = !isAgentAvailable || details?.readOnly;

  return (
    <>
      <NameNDescription label="test" useUpdateEntity={useUpdateTestMutation} readOnly={isReadOnly} />
      <Labels label="test" useUpdateEntity={useUpdateTestMutation} readOnly={isReadOnly} />
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
