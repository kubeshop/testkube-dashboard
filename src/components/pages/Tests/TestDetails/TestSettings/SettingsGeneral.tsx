import {FC} from 'react';

import {Delete} from '@molecules/CommonSettings/Delete';

import {Labels} from '@organisms/EntityDetails/Settings/SettingsGeneral/Labels';
import {NameNDescription} from '@organisms/EntityDetails/Settings/SettingsGeneral/NameNDescription';

import {Permissions, usePermission} from '@permissions/base';

import {useDeleteTestMutation, useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import {FailureHandling} from './SettingsGeneral/FailureHandling';
import {Timeout} from './SettingsGeneral/Timeout';

export const SettingsGeneral: FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {details} = useEntityDetailsPick('details');

  return (
    <>
      <NameNDescription label="test" useUpdateEntity={useUpdateTestMutation} />
      <Labels label="test" useUpdateEntity={useUpdateTestMutation} />
      <Timeout />
      <FailureHandling />
      {mayDelete ? (
        <Delete
          name={details?.name!}
          label="test"
          description="The test will be permanently deleted, including its deployments analytical history. This action is irreversible and can not be undone."
          redirectUrl="/tests"
          useDeleteMutation={useDeleteTestMutation}
        />
      ) : null}
    </>
  );
};
