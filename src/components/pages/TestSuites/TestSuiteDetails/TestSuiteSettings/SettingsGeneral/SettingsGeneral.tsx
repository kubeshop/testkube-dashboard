import {FC} from 'react';

import {Space} from 'antd';

import Delete from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsGeneral/Delete';
import Labels from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsGeneral/Labels';
import NameNDescription from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsGeneral/NameNDescription';

import {Permissions, usePermission} from '@permissions/base';

const SettingsGeneral: FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);

  return (
    <Space size={30} direction="vertical">
      <NameNDescription />
      <Labels />
      {mayDelete ? <Delete /> : null}
    </Space>
  );
};

export default SettingsGeneral;
