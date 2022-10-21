import {memo, useEffect, useMemo} from 'react';

import {Dropdown, Form, Menu} from 'antd';

import {DownOutlined} from '@ant-design/icons';

import {TestWithExecution} from '@models/test';

import {Button, Skeleton} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {PageBlueprint} from '@organisms';

import {useGetAllTestSuitesQuery} from '@services/testSuites';
import {useGetAllTestsQuery} from '@services/tests';
import {useGetTriggersKeymapQuery, useGetTriggersListQuery, useUpdateTriggersMutation} from '@services/triggers';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@src/utils/notification';

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
    description: 'Identify your cluster and testkube resource by na,e',
  },
  {
    key: 'label-name',
    label: 'Labels to Name',
    description: 'Identify your cluster resources by labels, your testkube resource by name',
  },
];

const Triggers = () => {
  const {data: triggersKeymap, isLoading: keymapLoading} = useGetTriggersKeymapQuery();
  const {data: testsList = [], isLoading: testsLoading} = useGetAllTestsQuery();
  const {data: testsSuitesList = [], isLoading: testSuitesLoading} = useGetAllTestSuitesQuery();
  const {data: triggersList, isLoading: triggersLoading} = useGetTriggersListQuery();

  const [updateTriggers] = useUpdateTriggersMutation();

  const [form] = Form.useForm();

  const setDefaultTriggersData = (_triggersList: any) => {
    if (_triggersList) {
      const triggersData = _triggersList.map((item: any) => {
        try {
          const isResourceName = item.resourceSelector.name;
          const isTestName = item.testSelector.name;
          const resourceType = isResourceName ? 'name' : 'labels';
          const testType = isTestName ? 'name' : 'labels';
          return {
            ...item,
            type: [resourceType, testType],
            resourceSelector: isResourceName || item.resourceSelector.labelSelector.matchLabels,
            testSelector: isTestName || item.testSelector.labelSelector.matchLabels,
            action: `${item.action} ${item.execution}`,
          };
        } catch (err) {
          return null;
        }
      });
      form.setFieldsValue({
        triggers: triggersData,
      });
    }
  };

  useEffect(() => {
    setDefaultTriggersData(triggersList);
  }, [triggersList]);

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

  const resourcesOptions = triggersKeymap?.resources.map((item: string) => ({label: item, value: item}));
  const actionOptions = triggersKeymap?.actions
    .map((actionItem: string) => {
      return triggersKeymap.executions.map(executionItem => {
        const label = `${actionItem} ${executionItem}`;
        return {label, value: label};
      });
    })
    .flat();
  const events = triggersKeymap?.events;

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
        return {
          name: formValue,
          namespace: 'testkube',
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
        namespace: 'testkube',
        resourceSelector: getSelector(trigger.resourceSelector),
        testSelector: getSelector(trigger.testSelector),
      };
      delete triggerPayload.type;
      return triggerPayload;
    });

    updateTriggers(body)
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => notificationCall('passed', 'Triggers succesfully updated'));
      })
      .catch(error => {
        displayDefaultErrorNotification(error);
      });
  };

  const isLoading = keymapLoading || testsLoading || testSuitesLoading || triggersLoading;

  return (
    <PageBlueprint
      title="Triggers"
      description={
        <>
          Listen for events and run specific testkube actions.{' '}
          <a href="https://kubeshop.github.io/testkube/test-types/executor-custom" target="_blank">
            Learn more about Triggers
          </a>
        </>
      }
    >
      <Form name="triggers-form" form={form} onFinish={onSave}>
        <ConfigurationCard
          title="Cluster events"
          description="Testkube can listen to cluster events and trigger specific actions. Events and actions are related to labelled resources."
          onConfirm={() => {
            form.submit();
          }}
          onCancel={() => {
            setDefaultTriggersData(triggersList);
          }}
        >
          {isLoading ? (
            <>
              <Skeleton />
            </>
          ) : (
            <Form.List name="triggers" initialValue={[]}>
              {(fields, {add, remove}) => (
                <Wrapper>
                  {fields.map((key, name) => {
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
                        form={form}
                        testsData={testsData}
                        testSuitesData={testSuitesData}
                      />
                    );
                  })}
                  <Dropdown overlay={() => addTriggerMenu(add)} placement="bottomLeft" trigger={['click']}>
                    <Button $customType="secondary" style={{width: '160px'}}>
                      Add a new trigger <DownOutlined />
                    </Button>
                  </Dropdown>
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
