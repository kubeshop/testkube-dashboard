import {memo, useContext, useEffect, useMemo, useState} from 'react';

import {DownOutlined} from '@ant-design/icons';
import {Dropdown, Form} from 'antd';

import {ExternalLink} from '@atoms';

import {MainContext} from '@contexts';

import {Button, Skeleton, Text} from '@custom-antd';

import {TestForTrigger} from '@models/test';
import {TestSuiteForTrigger} from '@models/testSuite';
import {TestTrigger, TestTriggerFormEntity} from '@models/triggers';

import {ConfigurationCard, notificationCall} from '@molecules';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {PageBlueprint} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useAppSelector} from '@redux/hooks';
import {selectNamespace} from '@redux/reducers/configSlice';
import {selectExecutors} from '@redux/reducers/executorsSlice';

import {useGetAllTestSuitesQuery} from '@services/testSuites';
import {useGetAllTestsQuery} from '@services/tests';
import {useGetTriggersKeyMapQuery, useGetTriggersListQuery, useUpdateTriggersMutation} from '@services/triggers';

import {externalLinks} from '@utils/externalLinks';
import {safeRefetch} from '@utils/fetchUtils';
import {displayDefaultNotificationFlow} from '@utils/notification';
import {PollingIntervals} from '@utils/numbers';

import AddTriggerOption from './AddTriggerOption';
import TriggerItem from './TriggerItem';
import {Wrapper} from './Triggers.styled';
import {addTriggerOptions} from './utils';

type TriggersFormValues = {
  triggers: TestTriggerFormEntity[];
};

const Triggers: React.FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  // TODO: Check if that was expected permissions setup for triggers?
  const isTriggersAvailable = usePermission(Permissions.createEntity);
  const mayEdit = usePermission(Permissions.editEntity);

  const {data: triggersKeyMap, isLoading: keyMapLoading} = useGetTriggersKeyMapQuery(null, {skip: !isClusterAvailable});
  const {data: testsList = [], isLoading: testsLoading} = useGetAllTestsQuery(null, {skip: !isClusterAvailable});
  const {data: testsSuitesList = [], isLoading: testSuitesLoading} = useGetAllTestSuitesQuery(null, {
    skip: !isClusterAvailable,
  });
  const {
    data: triggersList,
    isLoading: triggersLoading,
    refetch,
  } = useGetTriggersListQuery(null, {
    pollingInterval: PollingIntervals.long,
    skip: !isClusterAvailable,
  });

  const [updateTriggers] = useUpdateTriggersMutation();

  const [form] = Form.useForm<TriggersFormValues>();

  const [defaultFormattedTriggers, setDefaultFormattedTriggers] = useState<TestTriggerFormEntity[]>([]);

  const appNamespace = useAppSelector(selectNamespace);
  const executors = useAppSelector(selectExecutors);

  const setDefaultTriggersData = (_triggersList: TestTrigger[]) => {
    if (_triggersList && _triggersList.length) {
      try {
        const triggersData: TestTriggerFormEntity[] = _triggersList.map(trigger => {
          const {resourceSelector, testSelector, action, execution} = trigger;

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
        });

        form.setFieldsValue({
          triggers: triggersData,
        });

        setDefaultFormattedTriggers(triggersData);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    } else {
      form.setFieldsValue({
        triggers: [],
      });
    }
  };

  useEffect(() => {
    setDefaultTriggersData(triggersList || []);
  }, [triggersList]);

  useEffect(() => {
    safeRefetch(refetch);
  }, []);

  const testsData: TestForTrigger[] = useMemo(() => {
    return testsList.map(item => ({
      name: item.test.name,
      namespace: item.test.namespace,
      type: item.test.type,
    }));
  }, [testsList]);

  const testSuitesData: TestSuiteForTrigger[] = useMemo(() => {
    return testsSuitesList.map(item => ({
      name: item.testSuite.name,
      namespace: item.testSuite.namespace,
    }));
  }, [testsSuitesList]);

  const resourcesOptions = triggersKeyMap?.resources.map(item => ({label: item, value: item}));
  const actionOptions = triggersKeyMap?.actions
    .map((actionItem: string) => {
      return triggersKeyMap.executions.map(executionItem => {
        const label = `${actionItem} ${executionItem}`;
        return {label, value: label};
      });
    })
    .flat();
  const events = triggersKeyMap?.events;

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

  const onSave = () => {
    const values = form.getFieldsValue();

    const body = values.triggers.map(trigger => {
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

    return updateTriggers(body)
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => notificationCall('passed', 'Triggers successfully updated'));
  };

  const isLoading = keyMapLoading || testsLoading || testSuitesLoading || triggersLoading;

  return (
    <PageBlueprint
      title="Triggers"
      description={
        <>
          Listen for events and run specific testkube actions.{' '}
          <ExternalLink href={externalLinks.testTriggers}>Learn more about Triggers</ExternalLink>
        </>
      }
    >
      <Form name="triggers-form" form={form} onFinish={onSave} disabled={!isTriggersAvailable}>
        <ConfigurationCard
          title="Cluster events"
          description="Testkube can listen to cluster events and trigger specific actions. Events and actions are related to labelled resources."
          onConfirm={onSave}
          onCancel={() => {
            setDefaultTriggersData(triggersList || []);
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

                      const triggerItemKey = `trigger-${name}`;

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
                          key={triggerItemKey}
                        />
                      );
                    })
                  ) : !isTriggersAvailable ? (
                    <Text className="regular">We could not find any existing triggers in this environment.</Text>
                  ) : null}
                  {isTriggersAvailable ? (
                    <Dropdown
                      overlayClassName="light-dropdown"
                      menu={{
                        items: addTriggerOptions.map(({key, ...restProps}) => ({
                          key,
                          label: <AddTriggerOption {...restProps} onSelect={() => add({type: key.split('-')})} />,
                        })),
                      }}
                      placement="bottomLeft"
                      trigger={['click']}
                      disabled={!isClusterAvailable}
                    >
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
