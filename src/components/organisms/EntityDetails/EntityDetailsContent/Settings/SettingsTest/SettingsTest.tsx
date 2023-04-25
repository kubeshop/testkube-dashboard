import {useContext} from 'react';

import {Space} from 'antd';

import {notificationCall} from '@molecules';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateTestMutation} from '@services/tests';

import {EntityDetailsContext} from '@contexts';

import Source from './Source';
import TestType from './TestType';

const SettingsTest = () => {
  const {entityDetails} = useContext(EntityDetailsContext);

  const [updateTestMutation] = useUpdateTestMutation();

  const updateTest = (data: Object) => {
    updateTestMutation({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        ...data,
      },
    }).then((res: any) => {
      displayDefaultNotificationFlow(res, () => {
        notificationCall('passed', `Test settings was successfully updated.`);
      });
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
