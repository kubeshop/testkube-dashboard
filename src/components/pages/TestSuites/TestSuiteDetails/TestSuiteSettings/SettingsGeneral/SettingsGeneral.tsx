import {FC} from 'react';

import {Space} from 'antd';

import {Delete} from '@molecules/CommonSettings';

import {Labels, NameNDescription} from '@organisms/EntityDetails';

import {Permissions, usePermission} from '@permissions/base';

import {useDeleteTestSuiteMutation} from '@services/testSuites';

import {useEntityDetailsPick} from '@store/entityDetails';

const SettingsGeneral: FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {details} = useEntityDetailsPick('details');

  return (
    <Space size={30} direction="vertical">
      <NameNDescription />
      <Labels />
      {mayDelete ? (
        <Delete
          name={details?.name!}
          label="test suite"
          description="The test suite will be permanently deleted, including its deployments analytical history. This action is irreversible and can not be undone."
          redirectUrl="/test-suites"
          useDeleteMutation={useDeleteTestSuiteMutation}
        />
      ) : null}
    </Space>
  );
};

export default SettingsGeneral;
