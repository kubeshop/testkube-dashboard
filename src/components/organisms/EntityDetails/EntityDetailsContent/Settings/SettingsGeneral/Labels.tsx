import {useContext} from 'react';

import {Form, Select} from 'antd';

import {Entity} from '@models/entity';

import {ConfigurationCard, notificationCall} from '@molecules';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';
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
  const [form] = Form.useForm();

  const [updateTest] = useUpdateTestMutation();
  const [updateTestSuite] = useUpdateTestSuiteMutation();

  const {data} = useGetLabelsQuery(null);
  const updateRequestsMap: {[key in Entity]: any} = {
    'test-suites': updateTestSuite,
    tests: updateTest,
  };

  if (!entity || !entityDetails) {
    return null;
  }
  const entityLabels = entityDetails?.labels || {};

  const labels = Object.entries(entityLabels).map(([key, value]) => `${key}:${value}`);
  // const labels = entityLabels.map((value: any) => (typeof value === 'string' ? value : JSON.stringify(value)));

  const onSave = (values: any) => {
    updateRequestsMap[entity]({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        labels: values.labels.reduce((previousValue: any, currentValue: string) => {
          const keyValuePair = currentValue.split('_');
          return {
            ...previousValue,
            [keyValuePair[0]]: keyValuePair[1],
          };
        }),
      },
    })
      .then((res: any) => {
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
      isButtonsDisabled={
        !form.isFieldsTouched() || form.getFieldsError().filter(({errors}) => errors.length).length > 0
      }
    >
      <Form form={form} onFinish={onSave} name="general-settings-name-description" initialValues={{labels}}>
        <Form.Item name="labels">
          <Select placeholder="Labels" mode="multiple" allowClear showArrow disabled options={data || []} />
        </Form.Item>
      </Form>
    </ConfigurationCard>
  );
};

export default Labels;
