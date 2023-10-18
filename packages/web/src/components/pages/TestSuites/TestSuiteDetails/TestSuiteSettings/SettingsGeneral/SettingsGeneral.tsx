import {FC} from 'react';

import {useLegacySlotFirst} from '@testkube/web/src/legacyHooks';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {Delete} from '@molecules/CommonSettings';

import {Labels, NameNDescription} from '@organisms/EntityDetails';

import {Permissions, usePermission} from '@permissions/base';

import {useDeleteTestSuiteMutation, useUpdateTestSuiteMutation} from '@services/testSuites';

import {useEntityDetailsPick} from '@store/entityDetails';

const SettingsGeneral: FC = () => {
  const isWritable = useSystemAccess(SystemAccess.agent);
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {details} = useEntityDetailsPick('details');
  const deleteTestSuiteExtension = useLegacySlotFirst('deleteTestSuiteExtension');
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
