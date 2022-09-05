import {useContext} from 'react';

import {Space} from 'antd';

import {EntityDetailsContext} from '@contexts';

import Arguments from './Arguments';
import Variables from './Variables';

const SettingsVariables: React.FC = () => {
  const {entity} = useContext(EntityDetailsContext);

  return (
    <Space size={30} direction="vertical">
      <Variables />
      {entity === 'tests' ? <Arguments /> : null}
    </Space>
  );
};

export default SettingsVariables;
