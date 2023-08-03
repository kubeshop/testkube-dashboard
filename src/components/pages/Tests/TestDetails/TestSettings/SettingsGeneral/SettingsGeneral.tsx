import {Space} from 'antd';

import NameNDescription from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsGeneral/NameNDescription';
import Labels from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsGeneral/Labels';
import Delete from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsGeneral/Delete';

import {Permissions, usePermission} from '@permissions/base';

import FailureHandling from './FailureHandling';
import Timeout from './Timeout';

const SettingsGeneral: React.FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);

  return (
    <Space size={30} direction="vertical">
      <NameNDescription />
      <Labels />
      <Timeout />
      <FailureHandling />
      {mayDelete ? <Delete /> : null}
    </Space>
  );
};

export default SettingsGeneral;
