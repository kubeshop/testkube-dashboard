import {FC} from 'react';

import {Variables} from '@organisms/EntityDetails';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import Arguments from './Arguments';

const SettingsVariables: FC = () => {
  const {details} = useEntityDetailsPick('details');
  return (
    <>
      <Variables
        description="Define environment variables which will be shared across your test."
        readOnly={details.readOnly}
        useUpdateEntity={useUpdateTestMutation}
      />
      <Arguments readOnly={details.readOnly} />
    </>
  );
};

export default SettingsVariables;
