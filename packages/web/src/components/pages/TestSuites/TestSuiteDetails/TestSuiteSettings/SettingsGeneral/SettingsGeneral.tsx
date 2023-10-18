import {FC} from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {Delete} from '@molecules/CommonSettings';

import {Labels, NameNDescription} from '@organisms/EntityDetails';

import {Permissions, usePermission} from '@permissions/base';

import {useTestsSlot} from '@plugins/tests-and-test-suites/hooks';

import {useDeleteTestSuiteMutation, useUpdateTestSuiteMutation} from '@services/testSuites';

import {useEntityDetailsPick} from '@store/entityDetails';

const SettingsGeneral: FC = () => {
  const isWritable = useSystemAccess(SystemAccess.agent);
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {details} = useEntityDetailsPick('details');
  // TODO: Instead, use always the slot, and register current <Delete /> as fallback
  const deleteTestSuiteExtension = useTestsSlot('deleteTestSuiteExtension');
  const [deleteTestSuite] = useDeleteTestSuiteMutation();

  return (
    <>
      <NameNDescription label="test suite" useUpdateEntity={useUpdateTestSuiteMutation} readOnly={!isWritable} />
      <Labels label="test suite" useUpdateEntity={useUpdateTestSuiteMutation} readOnly={!isWritable} />
      {mayDelete && isWritable ? (
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
