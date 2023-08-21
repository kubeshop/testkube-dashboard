import {FC} from 'react';

import {FullWidthSpace} from '@custom-antd';

import Delete from './Delete';
import Name from './Name';

const GeneralTab: FC = () => {
  return (
    <FullWidthSpace size={32} direction="vertical">
      <Name />
      <Delete />
    </FullWidthSpace>
  );
};

export default GeneralTab;
