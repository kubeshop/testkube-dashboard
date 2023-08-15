import {FC} from 'react';

import {FullWidthSpace} from '@custom-antd';

import Condition from './Condition';

const ConditionTab: FC = () => {
  return (
    <FullWidthSpace size={32} direction="vertical">
      <Condition />
    </FullWidthSpace>
  );
};

export default ConditionTab;
