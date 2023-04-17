import {memo, useEffect, useMemo, useState} from 'react';

import {Dropdown, Form, Menu} from 'antd';

import {DownOutlined} from '@ant-design/icons';

import {TestWithExecution} from '@models/test';
import {TestTrigger} from '@models/triggers';

import {useAppSelector} from '@redux/hooks';
import {selectNamespace} from '@redux/reducers/configSlice';
import {selectExecutors} from '@redux/reducers/executorsSlice';

import {ExternalLink} from '@atoms';

import {Button, Skeleton, Text} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {PageBlueprint} from '@organisms';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';
import {PollingIntervals} from '@utils/numbers';

import {useGetAllTestSuitesQuery} from '@services/testSuites';
import {useGetAllTestsQuery} from '@services/tests';
import {useGetTriggersKeyMapQuery, useGetTriggersListQuery, useUpdateTriggersMutation} from '@services/triggers';

import {Permissions, usePermission} from '@permissions/base';

import AddTriggerOption from './AddTriggerOption';
import TriggerItem from './TriggerItem';
import {Wrapper} from './Triggers.styled';

export type TriggerType = 'label-label' | 'name-label' | 'name-name' | 'label-name';

const addTriggerOptions: {key: TriggerType; label: string; description: string}[] = [
  {
    key: 'label-label',
    label: 'Labels to Labels',
    description: 'Identify your cluster and testkube resources by label',
  },
  {
    key: 'name-label',
    label: 'Name to Labels',
    description: 'Identify your cluster resource by name, your testkube resources by label',
  },
  {
    key: 'name-name',
    label: 'Name to Name',
    description: 'Identify your cluster and testkube resource by name',
  },
  {
    key: 'label-name',
    label: 'Labels to Name',
    description: 'Identify your cluster resources by labels, your testkube resource by name',
  },
];

const Triggers: React.FC = () => {
  // TODO: Check if that was expected permissions setup for triggers?
  const isTriggersAvailable = usePermission(Permissions.createEntity);
  const mayEdit = usePermission(Permissions.editEntity);

  const {data: triggersKeyMap, isLoading: keyMapLoading} = useGetTriggersKeyMapQuery();
  const {data: testsList = [], isLoading: testsLoading} = useGetAllTestsQuery();
  const {data: testsSuitesList = [], isLoading: testSuitesLoading} = useGetAllTestSuitesQuery();
  const {
    data: triggersList,
    isLoading: triggersLoading,
    refetch,
  } = useGetTriggersListQuery(null, {
    pollingInterval: PollingIntervals.long,
  });

  const [updateTriggers] = useUpdateTriggersMutation();

  const [form] = Form.useForm();

  const [defaultFormattedTriggers, setDefaultFormattedTriggers] = useState<any>([]);

  const appNamespace = useAppSelector(selectNamespace);
  const executors = useAppSelector(selectExecutors);

  const setDefaultTriggersData = (_triggersList?: TestTrigger[]) => {
    if (_triggersList) {
      const triggersData = _triggersList.map(trigger => {
        const {resourceSelector, testSelector, action, execution} = trigger;

        try {
          const isResourceName = resourceSelector.name;
          const isTestName = testSelector.name;
          const resourceType = isResourceName ? 'name' : 'labels';
          const testType = isTestName ? 'name' : 'labels';

          return {
            ...trigger,
            type: [resourceType, testType],
            resourceSelector: isResourceName
              ? `${resourceSelector.namespace}/${resourceSelector.name}`
              : resourceSelector.labelSelector.matchLabels,
            testSelector: isTestName || testSelector.labelSelector.matchLabels,
            action: `${action} ${execution}`,
          };
        } catch (err) {
          return null;
        }
      });
      form.setFieldsValue({
        triggers: triggersData,
      });
      setDefaultFormattedTriggers(triggersData);
    }
  };

  useEffect(() => {
    setDefaultTriggersData(triggersList);
  }, [triggersList]);

  useEffect(() => {
    refetch();
  }, []);

  const testsData = useMemo(() => {
    return testsList.map((item: TestWithExecution) => ({
      name: item.test.name,
      namespace: item.test.namespace,
      type: item.test.type,
    }));
  }, [testsList]);

  const testSuitesData = useMemo(() => {
    return testsSuitesList.map((item: any) => ({
      name: item.testSuite.name,
      namespace: item.testSuite.namespace,
    }));
  }, [testsSuitesList]);

  const resourcesOptions = triggersKeyMap?.resources.map((item: string) => ({label: item, value: item}));
  const actionOptions = triggersKeyMap?.actions
    .map((actionItem: string) => {
      return triggersKeyMap.executions.map(executionItem => {
        const label = `${actionItem} ${executionItem}`;
        return {label, value: label};
      });
    })
    .flat();
  const events = triggersKeyMap?.events;

  const addTriggerMenu = (add: (value: any) => void) => {
    return (
      <Menu
        items={addTriggerOptions.map(({key, ...restProps}) => ({
          key,
          label: <AddTriggerOption {...restProps} onSelect={() => add({type: key.split('-')})} />,
        }))}
      />
    );
  };

  const onSave = (values: any) => {
    const getSelector = (formValue: any) => {
      if (typeof formValue === 'string') {
        if (formValue.includes('/')) {
          const [namespace, name] = formValue.split('/');
          return {
            name,
            namespace,
          };
        }
        return {
          name: formValue,
          namespace: appNamespace,
        };
      }
      if (formValue.length) {
        return {
          labelSelector: {
            matchLabels: decomposeLabels(formValue),
          },
        };
      }
      return {
        labelSelector: {
          matchLabels: formValue,
        },
      };
    };

    const body = values.triggers.map((trigger: any) => {
      const [action, execution] = trigger.action.split(' ');
      const triggerPayload = {
        ...trigger,
        action,
        execution,
        namespace: appNamespace,
        resourceSelector: getSelector(trigger.resourceSelector),
        testSelector: getSelector(trigger.testSelector),
      };
      delete triggerPayload.type;
      return triggerPayload;
    });

    updateTriggers(body)
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => notificationCall('passed', 'Triggers successfully updated'));
      })
      .catch(error => {
        displayDefaultErrorNotification(error);
      });
  };

  const isLoading = keyMapLoading || testsLoading || testSuitesLoading || triggersLoading;

  return (
    <PageBlueprint
      title="Triggers"
      description={
        <>
          Listen for events and run specific testkube actions.{' '}
          <ExternalLink href="https://kubeshop.github.io/testkube/using-testkube/triggers">
            Learn more about Triggers
          </ExternalLink>
        </>
      }
    >
      <Form name="triggers-form" form={form} onFinish={onSave} disabled={!isTriggersAvailable}>
        <ConfigurationCard
          title="Cluster events"
          description="Testkube can listen to cluster events and trigger specific actions. Events and actions are related to labelled resources."
          onConfirm={() => {
            form
              .validateFields()
              .then(() => form.submit())
              .catch(() => notificationCall('failed', 'Validate you triggers data, please'));
          }}
          onCancel={() => {
            setDefaultTriggersData(triggersList);
            form.resetFields();
          }}
          isButtonsDisabled={isLoading}
          enabled={mayEdit}
        >
          {isLoading ? (
            <>
              <Skeleton additionalStyles={{lineHeight: 40}} />
              <Skeleton additionalStyles={{lineHeight: 40}} />
            </>
          ) : (
            <Form.List name="triggers" initialValue={defaultFormattedTriggers}>
              {(fields, {add, remove}) => (
                <Wrapper>
                  {fields.length ? (
                    fields.map((key, name) => {
                      const triggerItemData = form.getFieldValue('triggers')[name];

                      if (!triggerItemData) {
                        return null;
                      }

                      return (
                        <TriggerItem
                          type={triggerItemData.type}
                          resources={resourcesOptions}
                          actions={actionOptions}
                          events={events}
                          name={name}
                          remove={remove}
                          testsData={testsData}
                          testSuitesData={testSuitesData}
                          isTriggersAvailable={isTriggersAvailable}
                          executors={executors}
                        />
                      );
                    })
                  ) : !isTriggersAvailable ? (
                    <Text className="regular">We could not find any existing triggers in this environment.</Text>
                  ) : null}
                  {isTriggersAvailable ? (
                    <Dropdown overlay={() => addTriggerMenu(add)} placement="bottomLeft" trigger={['click']}>
                      <Button $customType="secondary" style={{width: '160px'}}>
                        Add a new trigger <DownOutlined />
                      </Button>
                    </Dropdown>
                  ) : null}
                </Wrapper>
              )}
            </Form.List>
          )}
        </ConfigurationCard>
      </Form>
    </PageBlueprint>
  );
};

export default memo(Triggers);
