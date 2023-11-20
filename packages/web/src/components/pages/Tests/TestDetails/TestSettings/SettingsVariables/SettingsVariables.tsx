import {FC} from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {Variables} from '@organisms/EntityDetails';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import Arguments from './Arguments';

const SettingsVariables: FC = () => {
  const {details} = useEntityDetailsPick('details');
  const isAgentAvailable = useSystemAccess(SystemAccess.agent);
  return (
    <>
      <Variables
        description="Define environment variables which will be shared across your test."
        readOnly={!isAgentAvailable || details?.readOnly}
        useUpdateEntity={useUpdateTestMutation}
      />
      <Arguments readOnly={details.readOnly} />
    </>
  );
};

export default SettingsVariables;
