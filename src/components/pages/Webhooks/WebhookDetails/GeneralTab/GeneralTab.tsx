import {FC} from 'react';

import {FullWidthSpace} from '@custom-antd';

import Delete from './Delete';
import Name from './Name';
import Type from './Type';

const GeneralTab: FC = () => {
  return (
    <FullWidthSpace size={32} direction="vertical">
      <Name />
      <Type />
      <Delete />
    </FullWidthSpace>
  );
};

export default GeneralTab;
