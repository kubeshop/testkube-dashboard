import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {notificationCall} from '@molecules';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import {displayDefaultNotificationFlow} from '@utils/notification';

import Source from './Source';
import TestType from './TestType';

const SettingsTest: React.FC = () => {
  const isWritable = useSystemAccess(SystemAccess.agent);
  const {details} = useEntityDetailsPick('details');

  const [updateTestMutation] = useUpdateTestMutation();

  const updateTest = (data: Object) => {
    return updateTestMutation({
      id: details.name,
      data: {
        ...details,
        ...data,
      },
    })
      .then(displayDefaultNotificationFlow)
      .then(() => {
        notificationCall('passed', `Test settings was successfully updated.`);
      });
  };

  return (
    <>
      <TestType type={details.type} updateTest={updateTest} readOnly={!isWritable} />
      <Source details={details} updateTest={updateTest} readOnly={!isWritable} />
    </>
  );
};

export default SettingsTest;
