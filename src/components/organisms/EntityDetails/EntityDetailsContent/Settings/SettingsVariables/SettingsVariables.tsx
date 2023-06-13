import {Space} from 'antd';

import {useEntityDetailsStore} from '@store/entityDetails';

import Arguments from './Arguments';
import Variables from './Variables';

const SettingsVariables: React.FC = () => {
  const {entity} = useEntityDetailsStore(x => ({entity: x.entity}));

  return (
    <Space size={30} direction="vertical">
      <Variables />
      {entity === 'tests' ? <Arguments /> : null}
    </Space>
  );
};

export default SettingsVariables;
