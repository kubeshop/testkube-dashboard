import {FC} from 'react';

import CustomPayload from './CustomPayload';
import Headers from './Headers';
import URI from './URI';

const ActionTab: FC = () => {
  return (
    <>
      <URI />
      <CustomPayload />
      <Headers />
    </>
  );
};

export default ActionTab;
