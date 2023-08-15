import {FC} from 'react';

import {Delete} from '@molecules/CommonSettings';

import {Labels, NameNDescription} from '@organisms/EntityDetails';

import {Permissions, usePermission} from '@permissions/base';

import {useDeleteTestSuiteMutation, useUpdateTestSuiteMutation} from '@services/testSuites';

import {useEntityDetailsPick} from '@store/entityDetails';

const SettingsGeneral: FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {details} = useEntityDetailsPick('details');

  return (
    <>
      <NameNDescription label="test suite" useUpdateEntity={useUpdateTestSuiteMutation} />
      <Labels label="test suite" useUpdateEntity={useUpdateTestSuiteMutation} />
      {mayDelete ? (
        <Delete
          name={details?.name!}
          label="test suite"
          description="The test suite will be permanently deleted, including its deployments analytical history. This action is irreversible and can not be undone."
          redirectUrl="/test-suites"
          useDeleteMutation={useDeleteTestSuiteMutation}
        />
      ) : null}
    </>
  );
};

export default SettingsGeneral;
