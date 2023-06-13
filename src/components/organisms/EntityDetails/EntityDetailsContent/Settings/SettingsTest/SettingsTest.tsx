import {Space} from 'antd';

import {notificationCall} from '@molecules';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsStore} from '@store/entityDetails';

import {displayDefaultNotificationFlow} from '@utils/notification';

import Source from './Source';
import TestType from './TestType';

const SettingsTest: React.FC = () => {
  const {entityDetails} = useEntityDetailsStore(x => ({entityDetails: x.entityDetails}));

  const [updateTestMutation] = useUpdateTestMutation();

  const updateTest = (data: Object) => {
    return updateTestMutation({
      id: entityDetails.name,
      data: {
        ...entityDetails,
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
      <TestType type={entityDetails.type} updateTest={updateTest} />
      <Source entityDetails={entityDetails} updateTest={updateTest} />
    </Space>
  );
};

export default SettingsTest;
