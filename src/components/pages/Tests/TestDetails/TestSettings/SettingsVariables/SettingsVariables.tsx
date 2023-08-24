import {FC} from 'react';

import {Variables} from '@organisms/EntityDetails';

import {useUpdateTestMutation} from '@services/tests';

import Arguments from './Arguments';

const SettingsVariables: FC = () => (
  <>
    <Variables
      description="Define environment variables which will be shared across your test."
      useUpdateEntity={useUpdateTestMutation}
    />
    <Arguments />
  </>
);

export default SettingsVariables;
