import {FC} from 'react';

import {notificationCall} from '@molecules/Notification';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {Source} from './SettingsTest/Source';
import {TestType} from './SettingsTest/TestType';

export const SettingsTest: FC = () => {
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
      <TestType type={details.type} updateTest={updateTest} />
      <Source details={details} updateTest={updateTest} />
    </>
  );
};
