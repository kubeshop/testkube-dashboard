import {Space} from 'antd';

import {Delete} from '@molecules/CommonSettings';

import {Labels, NameNDescription} from '@organisms/EntityDetails';

import {Permissions, usePermission} from '@permissions/base';

import {useDeleteTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import FailureHandling from './FailureHandling';
import Timeout from './Timeout';

const SettingsGeneral: React.FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {details} = useEntityDetailsPick('details');

  return (
    <Space size={30} direction="vertical">
      <NameNDescription />
      <Labels />
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
    </Space>
  );
};

export default SettingsGeneral;
