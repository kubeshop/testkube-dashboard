import {FC} from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {Delete} from '@molecules/CommonSettings';

import {Labels, NameNDescription} from '@organisms/EntityDetails';

import {Permissions, usePermission} from '@permissions/base';

import {useTestsSlotFirst} from '@plugins/tests-and-test-suites/hooks';

import {useDeleteTestSuiteMutation, useUpdateTestSuiteMutation} from '@services/testSuites';

import {useEntityDetailsPick} from '@store/entityDetails';

const SettingsGeneral: FC = () => {
  const isAgentAvailable = useSystemAccess(SystemAccess.agent);
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {details} = useEntityDetailsPick('details');
  // TODO: Instead, use always the slot, and register current <Delete /> as fallback
  const deleteTestSuiteExtension = useTestsSlotFirst('deleteTestSuiteExtension');
  const [deleteTestSuite] = useDeleteTestSuiteMutation();
  const isReadOnly = !isAgentAvailable || details?.readOnly;

  return (
    <>
      <NameNDescription label="test suite" useUpdateEntity={useUpdateTestSuiteMutation} readOnly={isReadOnly} />
      <Labels label="test suite" useUpdateEntity={useUpdateTestSuiteMutation} readOnly={isReadOnly} />
      {mayDelete ? (
        deleteTestSuiteExtension !== undefined ? (
          deleteTestSuiteExtension
        ) : (
          <Delete
            name={details?.name!}
            label="test suite"
            description="The test suite will be permanently deleted, including its deployments analytical history. This action is irreversible and can not be undone."
            redirectUrl="/test-suites"
            onDelete={deleteTestSuite}
          />
        )
      ) : null}
    </>
  );
};

export default SettingsGeneral;
