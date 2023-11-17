import {useEffect, useState} from 'react';

import {Form, Select, Space} from 'antd';

import {LabelsSelect} from '@molecules';

import {useTriggersPick} from '@store/triggers';

import {required} from '@utils/form';

import ResourceTriggerSelect from './ResourceTriggerSelect';
import TriggerSelectorSwitcher from './TriggerSelectorSwitcher';

const ActionFormItems = () => {
  const {keyMap} = useTriggersPick('keyMap');

  const [actionValue, setActionValue] = useState<string>('');
  const [switcherValue, setSwitcherValue] = useState('label');

  const form = Form.useFormInstance();

  const nameSelector = form.getFieldValue('testNameSelector');

  useEffect(() => {
    setSwitcherValue(nameSelector ? 'name' : 'label');
  }, [nameSelector]);

  useEffect(() => {
    form.resetFields(['testNameSelector']);
  }, [actionValue]);

  const actionOptions = keyMap?.actions
    .map((actionItem: string) =>
      keyMap!.executions.map(executionItem => {
        const label = `${actionItem} ${executionItem}`;
        return {label, value: label};
      })
    )
    .flat();

  return (
    <>
      <Form.Item
        label="Testkube action"
        data-test="triggers-add-modal-action"
        required
        name="action"
        rules={[required]}
      >
        <Select
          value={actionValue}
          onChange={value => setActionValue(value)}
          options={actionOptions}
          placeholder="Select a testkube related action"
        />
      </Form.Item>
      <Space size={16} direction="vertical" style={{width: '100%'}}>
        <TriggerSelectorSwitcher
          data-test="triggers-add-modal-action-switch"
          value={switcherValue}
          onChange={setSwitcherValue}
        />
        {switcherValue === 'label' ? (
          <Form.Item
            label="Testkube resource"
            data-test="triggers-add-modal-action-label-selector"
            required
            name="testLabelSelector"
            rules={[required]}
          >
            <LabelsSelect />
          </Form.Item>
        ) : (
          <Form.Item
            label="Testkube resource"
            data-test="triggers-add-modal-action-name-selector"
            required
            name="testNameSelector"
            rules={[required]}
          >
            <ResourceTriggerSelect
              $allowTests={actionValue === 'run test'}
              $allowTestSuites={actionValue === 'run testsuite'}
            />
          </Form.Item>
        )}
      </Space>
    </>
  );
};

export default ActionFormItems;
