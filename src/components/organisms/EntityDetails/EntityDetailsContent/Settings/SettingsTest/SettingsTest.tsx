import {Space} from 'antd';

import {notificationCall} from '@molecules';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsStore} from '@store/entityDetails';

import {displayDefaultNotificationFlow} from '@utils/notification';

import Source from './Source';
import TestType from './TestType';

const SettingsTest: React.FC = () => {
  const {details} = useEntityDetailsStore(x => ({details: x.details}));

  const [updateTestMutation] = useUpdateTestMutation();

  const updateTest = (data: Object) => {
    return updateTestMutation({
      id: details.name,
      data: {
        ...details,
        ...data,
      },
    })
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => {
        notificationCall('passed', `Test settings was successfully updated.`);
      });
  };

  return (
    <Space size={30} direction="vertical">
      <TestType type={details.type} updateTest={updateTest} />
      <Source details={details} updateTest={updateTest} />
    </Space>
  );
};

export default SettingsTest;
