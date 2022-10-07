import {useContext, useState} from 'react';

import {Entity} from '@models/entity';
import {Option} from '@models/form';

import {ConfigurationCard, LabelsSelect, notificationCall} from '@molecules';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import {useUpdateTestSuiteMutation} from '@services/testSuites';
import {useUpdateTestMutation} from '@services/tests';

import {EntityDetailsContext} from '@contexts';

const namingMap: {[key in Entity]: string} = {
  'test-suites': 'test suite',
  tests: 'test',
};

const Labels: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);

  const [updateTest] = useUpdateTestMutation();
  const [updateTestSuite] = useUpdateTestSuiteMutation();

  const updateRequestsMap: {[key in Entity]: any} = {
    'test-suites': updateTestSuite,
    tests: updateTest,
  };

  const [localLabels, setLocalLabels] = useState<readonly Option[]>([]);
  const [wasTouched, setWasTouched] = useState(false);

  if (!entity || !entityDetails) {
    return null;
  }

  const entityLabels = entityDetails?.labels || {};

  const onSave = () => {
    updateRequestsMap[entity]({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        labels: decomposeLabels(localLabels),
      },
    })
      .then((res: any) => {
        if (!res.error) {
          setWasTouched(false);
        }

        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `${uppercaseFirstSymbol(namingMap[entity])} was succesfully updated.`);
        });
      })
      .catch((err: any) => {
        setWasTouched(true);
        displayDefaultErrorNotification(err);
      });
  };

  return (
    <ConfigurationCard
      title="Labels"
      description={`Define the labels you want to add for this ${namingMap[entity]}`}
      isButtonsDisabled={!wasTouched}
      onConfirm={onSave}
    >
      <LabelsSelect
        onChange={values => {
          setLocalLabels(values);
          setWasTouched(true);
        }}
        defaultLabels={entityLabels}
      />
    </ConfigurationCard>
  );
};

export default Labels;
