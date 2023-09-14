import {useEffect, useState} from 'react';

import {Form, Input, Select, Space} from 'antd';

import {LabelSelectorHelpIcon, LabelsSelect} from '@molecules';

import {useTriggersPick} from '@store/triggers';

import {required} from '@utils/form';

import TriggerSelectorSwitcher from './TriggerSelectorSwitcher';

const ConditionFormItems = () => {
  const {keyMap} = useTriggersPick('keyMap');

  const [switcherValue, setSwitcherValue] = useState('label');

  const nameSelector = Form.useFormInstance().getFieldValue('resourceNameSelector');

  useEffect(() => {
    setSwitcherValue(nameSelector ? 'name' : 'label');
  }, [nameSelector]);

  const resourcesOptions = keyMap?.resources.map(item => ({label: item, value: item}));
  const events = keyMap?.events;

  return (
    <>
      <Form.Item label="K8s resource" required name="resource" rules={[required]}>
        <Select options={resourcesOptions} placeholder="Select a K8s resource" />
      </Form.Item>
      <Space size={16} direction="vertical" style={{width: '100%'}}>
        <TriggerSelectorSwitcher value={switcherValue} onChange={setSwitcherValue} />
        {switcherValue === 'label' ? (
          <Form.Item
            label={
              <>
                Resource identifier
                <LabelSelectorHelpIcon />
              </>
            }
            required
            name="resourceLabelSelector"
            rules={[required]}
          >
            <LabelsSelect />
          </Form.Item>
        ) : (
          <Form.Item label="Resource identifier" required name="resourceNameSelector" rules={[required]}>
            <Input placeholder="e.g.: namespace/resource-name" />
          </Form.Item>
        )}
      </Space>
      <Form.Item noStyle shouldUpdate>
        {({getFieldValue}) => {
          const triggerResource = getFieldValue('resource');

          const eventsOptions =
            events && triggerResource
              ? events[triggerResource].map((item: string) => ({label: item, value: item}))
              : [];

          return (
            <Form.Item label="Triggered event" name="event" rules={[required]}>
              <Select
                options={eventsOptions}
                disabled={eventsOptions.length === 0 ? true : undefined}
                placeholder="Select cluster event"
              />
            </Form.Item>
          );
        }}
      </Form.Item>
    </>
  );
};

export default ConditionFormItems;
