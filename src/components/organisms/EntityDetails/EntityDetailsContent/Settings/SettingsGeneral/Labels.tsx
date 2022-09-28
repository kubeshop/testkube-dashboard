import {useContext, useState} from 'react';

import {Entity} from '@models/entity';
import {Option} from '@models/form';

import {CreatableMultiSelect} from '@atoms';
import {LabelsMultiValueLabel, LabelsOption} from '@atoms/CreatableMultiSelect/CustomComponents';

import {ConfigurationCard, notificationCall} from '@molecules';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';
import {PollingIntervals} from '@utils/numbers';
import {uppercaseFirstSymbol} from '@utils/strings';

import {useGetLabelsQuery} from '@services/labels';
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

  const {data} = useGetLabelsQuery(null, {pollingInterval: PollingIntervals.default});

  if (!entity || !entityDetails) {
    return null;
  }
  const entityLabels = entityDetails?.labels || {};
  const defaultLabels = Object.entries(entityLabels).map(([key, value]) => {
    const labelString = `${key}${value ? `:${value}` : ''}`;
    return {
      label: labelString,
      value: labelString,
    };
  });
  const options = Object.entries(data || {})
    .map(([key, value]) => {
      return value.map((item: any) => {
        const labelString = `${key}${item ? `:${item}` : ''}`;
        return {
          label: labelString,
          value: labelString,
        };
      });
    })
    .flat();

  const onSave = () => {
    updateRequestsMap[entity]({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        labels: localLabels.reduce((previousValue: any, currentValue: Option) => {
          const labelString = currentValue.value;
          if (typeof labelString === 'string' && labelString.includes(':')) {
            const [key, ...rest] = labelString.split(':');
            return {
              ...previousValue,
              [key.trim()]: rest.join(':').trim(),
            };
          }
          return {
            ...previousValue,
            [labelString]: '',
          };
        }, {}),
      },
    })
      .then((res: any) => {
        setWasTouched(false);
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `${uppercaseFirstSymbol(namingMap[entity])} was succesfully updated.`);
        });
      })
      .catch((err: any) => {
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
      <CreatableMultiSelect
        onChange={(values: any) => {
          setLocalLabels(values);
          setWasTouched(true);
        }}
        placeholder="Add or create new labels"
        formatCreateLabel={(inputString: string) => {
          if (inputString.includes(':')) {
            return `Create ${inputString}`;
          }
          return 'Create: You need to add a : separator to create this label';
        }}
        defaultValue={defaultLabels}
        options={options}
        CustomOptionComponent={LabelsOption}
        CustomMultiValueLabelComponent={LabelsMultiValueLabel}
        validateCreation={inputValue => Boolean(inputValue.match(/(.+:.*)/g))}
      />
    </ConfigurationCard>
  );
};

export default Labels;
