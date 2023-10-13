import {notificationCall} from '@molecules';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import {displayDefaultNotificationFlow} from '@utils/notification';

import Source from './Source';
import TestType from './TestType';

const SettingsTest: React.FC = () => {
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
      <TestType type={details.type} updateTest={updateTest} readOnly={details.readOnly} />
      <Source details={details} updateTest={updateTest} readOnly={details.readOnly} />
    </>
  );
};

export default SettingsTest;
