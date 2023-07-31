import {Space} from 'antd';

import {useEntityDetailsPick} from '@store/entityDetails';

import Arguments from './Arguments';
import Variables from './Variables';

const SettingsVariables: React.FC = () => {
  const {entity} = useEntityDetailsPick('entity');

  return (
    <Space size={30} direction="vertical">
      <Variables />
      {entity === 'tests' ? <Arguments /> : null}
    </Space>
  );
};

export default SettingsVariables;
