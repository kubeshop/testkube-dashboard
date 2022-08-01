import {useContext} from 'react';

import {Entity} from '@models/entity';

import {ConfigurationCard, notificationCall} from '@molecules';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import {useDeleteTestSuiteMutation} from '@services/testSuites';
import {useDeleteTestMutation} from '@services/tests';

import {EntityExecutionsContext, MainContext} from '@contexts';

const namingMap: {[key in Entity]: string} = {
  'test-suites': 'test suite',
  tests: 'test',
};

const Delete: React.FC = () => {
  const {entity, entityDetails, defaultStackRoute} = useContext(EntityExecutionsContext);
  const {navigate} = useContext(MainContext);

  const [deleteTest] = useDeleteTestMutation();
  const [deleteTestSuite] = useDeleteTestSuiteMutation();

  const deleteRequestsMap: {[key in Entity]: any} = {
    'test-suites': deleteTestSuite,
    tests: deleteTest,
  };

  if (!entity || !entityDetails) {
    return null;
  }

  const onConfirm = () => {
    deleteRequestsMap[entity](entityDetails.name)
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `${uppercaseFirstSymbol(namingMap[entity])} was succesfully deleted.`);

          navigate(defaultStackRoute);
        });
      })
      .catch((err: any) => {
        displayDefaultErrorNotification(err);
      });
  };

  return (
    <ConfigurationCard
      title={`Delete this ${namingMap[entity]}`}
      description="The test suite will be permanently deleted, including its deployments analytical history. This action is irreversible and can not be undone."
      onConfirm={onConfirm}
      isWarning
      confirmButtonText="Delete"
    />
  );
};

export default Delete;
