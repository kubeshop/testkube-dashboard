import {useEffect, useState} from 'react';

import {Form, Select, Space} from 'antd';

import {LabelsSelect} from '@molecules';

import {useTriggersPick} from '@store/triggers';

import {required} from '@utils/form';

import ResourceTriggerSelect from './ResourceTriggerSelect';
import TriggerSelectorSwitcher from './TriggerSelectorSwitcher';

const ActionFormItems = () => {
  const {keyMap} = useTriggersPick('keyMap');

  const [switcherValue, setSwitcherValue] = useState('label');

  const nameSelector = Form.useFormInstance().getFieldValue('testNameSelector');

  useEffect(() => {
    setSwitcherValue(nameSelector ? 'name' : 'label');
  }, [nameSelector]);

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
      <Form.Item label="Testkube action" required name="action" rules={[required]}>
        <Select options={actionOptions} placeholder="Select a testkube related action" />
      </Form.Item>
      <Space size={16} direction="vertical" style={{width: '100%'}}>
        <TriggerSelectorSwitcher value={switcherValue} onChange={setSwitcherValue} />
        {switcherValue === 'label' ? (
          <Form.Item label="Testkube resource" required name="testLabelSelector" rules={[required]}>
            <LabelsSelect />
          </Form.Item>
        ) : (
          <Form.Item label="Testkube resource" required name="testNameSelector" rules={[required]}>
            <ResourceTriggerSelect />
          </Form.Item>
        )}
      </Space>
    </>
  );
};

export default ActionFormItems;
