import {FC} from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {Variables} from '@organisms/EntityDetails';

import {useUpdateTestSuiteMutation} from '@services/testSuites';

import {useEntityDetailsPick} from '@store/entityDetails';

const SettingsVariables: FC = () => {
  const {details} = useEntityDetailsPick('details');
  const isAgentAvailable = useSystemAccess(SystemAccess.agent);
  return (
    <Variables
      description="Define environment variables which will be shared across your tests. Variables defined at a Test Suite level will override those defined at a Test level."
      readOnly={!isAgentAvailable || details?.readOnly}
      useUpdateEntity={useUpdateTestSuiteMutation}
    />
  );
};
export default SettingsVariables;
