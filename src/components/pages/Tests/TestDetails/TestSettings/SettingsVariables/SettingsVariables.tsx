import {FC} from 'react';

import {Variables} from '@organisms/EntityDetails';

import Arguments from './Arguments';

const SettingsVariables: FC = () => (
  <>
    <Variables description="Define environment variables which will be shared across your test." />
    <Arguments />
  </>
);

export default SettingsVariables;
