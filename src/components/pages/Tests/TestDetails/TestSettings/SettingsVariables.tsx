import {FC} from 'react';

import {Variables} from '@organisms/EntityDetails/Settings/SettingsVariables/Variables';

import {useUpdateTestMutation} from '@services/tests';

import {Arguments} from './SettingsVariables/Arguments';

export const SettingsVariables: FC = () => (
  <>
    <Variables
      description="Define environment variables which will be shared across your test."
      useUpdateEntity={useUpdateTestMutation}
    />
    <Arguments />
  </>
);
