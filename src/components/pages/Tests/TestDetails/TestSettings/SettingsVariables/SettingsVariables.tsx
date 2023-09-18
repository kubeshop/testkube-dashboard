import {FC} from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {Variables} from '@organisms/EntityDetails';

import {useUpdateTestMutation} from '@services/tests';

import Arguments from './Arguments';

const SettingsVariables: FC = () => {
  const isWritable = useSystemAccess(SystemAccess.agent);
  return (
    <>
      <Variables
        description="Define environment variables which will be shared across your test."
        readOnly={!isWritable}
        useUpdateEntity={useUpdateTestMutation}
      />
      <Arguments readOnly={!isWritable} />
    </>
  );
};

export default SettingsVariables;
