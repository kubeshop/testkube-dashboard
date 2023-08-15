import {FC} from 'react';

import {FullWidthSpace} from '@custom-antd';

import CustomPayload from './CustomPayload';
import Headers from './Headers';
import URI from './URI';

const ActionTab: FC = () => {
  return (
    <FullWidthSpace size={32} direction="vertical">
      <URI />
      <CustomPayload />
      <Headers />
    </FullWidthSpace>
  );
};

export default ActionTab;
