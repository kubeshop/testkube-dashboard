import {useEffect, useState} from 'react';

import {Form, Input, Select, Space} from 'antd';

import {LabelsSelect} from '@molecules';

import {useStore} from '@store';

import {required} from '@utils/form';

import TriggerSelectorSwitcher from './TriggerSelectorSwitcher';

const ConditionFormItems = () => {
  const {triggersKeyMap} = useStore(state => ({
    triggersKeyMap: state.triggersKeyMap!,
  }));

  const [switcherValue, setSwitcherValue] = useState('label');

  const nameSelector = Form.useFormInstance().getFieldValue('resourceNameSelector');

  useEffect(() => {
    setSwitcherValue(nameSelector ? 'name' : 'label');
  }, [nameSelector]);

  const resourcesOptions = triggersKeyMap?.resources.map(item => ({label: item, value: item}));
  const events = triggersKeyMap?.events;

  return (
    <>
      <Form.Item label="K8s resource" required name="resource" rules={[required]}>
        <Select options={resourcesOptions} placeholder="Select a K8s resource" />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({getFieldValue, getFieldError}) => {
          const label = getFieldValue('resourceLabelSelector');
          const isValid = !(getFieldError('resourceLabelSelector').length > 0);

          return (
            <Space size={16} direction="vertical" style={{width: '100%'}}>
              <TriggerSelectorSwitcher value={switcherValue} onChange={setSwitcherValue} />
              {switcherValue === 'label' ? (
                <Form.Item label="Resource identifier" required name="resourceLabelSelector" rules={[required]}>
                  <LabelsSelect defaultLabels={label} validation={isValid} />
                </Form.Item>
              ) : (
                <Form.Item label="Resource identifier" required name="resourceNameSelector" rules={[required]}>
                  <Input placeholder="e.g.: namespace/resource-name" />
                </Form.Item>
              )}
            </Space>
          );
        }}
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({getFieldValue}) => {
          const triggerResource = getFieldValue('resource');

          const eventsOptions =
            events && triggerResource
              ? events[triggerResource].map((item: string) => ({label: item, value: item}))
              : [];

          return (
            <Form.Item label="Triggered event" name="event" rules={[required]}>
              <Select options={eventsOptions} disabled={!triggerResource} placeholder="Select cluster event" />
            </Form.Item>
          );
        }}
      </Form.Item>
    </>
  );
};

export default ConditionFormItems;
