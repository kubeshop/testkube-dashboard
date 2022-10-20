import {memo, useEffect, useMemo} from 'react';

import {Dropdown, Form, Menu} from 'antd';

import {DownOutlined} from '@ant-design/icons';

import {TestWithExecution} from '@models/test';

import {Button, Skeleton} from '@custom-antd';

import {ConfigurationCard} from '@molecules';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {PageBlueprint} from '@organisms';

import {useGetAllTestSuitesQuery} from '@services/testSuites';
import {useGetAllTestsQuery} from '@services/tests';
import {useCreateTriggerMutation, useGetTriggersKeymapQuery, useGetTriggersListQuery} from '@services/triggers';

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

  const [createTrigger] = useCreateTriggerMutation();

  const [form] = Form.useForm();

  useEffect(() => {
    if (triggersList) {
      const triggersData = triggersList.map((item: any) => {
        try {
          const isResourceName = item.resourceSelector.name;
          const isTestName = item.testSelector.name;
          const resourceType = isResourceName ? 'name' : 'labels';
          const testType = isTestName ? 'name' : 'labels';
          return {
            ...item,
            type: [resourceType, testType],
            resourceSelector: isResourceName || item.resourceSelector.labelsSelector.matchLabels,
            testSelector: isTestName || item.testSelector.labelSelector.matchLabels,
          };
        } catch (err) {
          return null;
        }
      });
      console.log(triggersData);
      form.setFieldsValue({
        triggers: triggersData,
      });
    }
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
  const actionOptions = triggersKeymap?.actions.map((item: string) => ({label: item, value: item}));
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
        return JSON.parse(formValue);
      }
      if (formValue.length) {
        return {
          labelSelector: {
            matchLabels: decomposeLabels(formValue),
          },
        };
      }
      return null;
    };

    const body = {
      ...values.triggers[0],
      namespace: 'testkube',
      execution: 'test',
      resourceSelector: getSelector(values.triggers[0].resourceSelector),
      testSelector: getSelector(values.triggers[0].testSelector),
    };
    delete body.type;

    console.log(body);
    // createTrigger(body).then((res: any) => {
    //   console.log(res);
    // });
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
