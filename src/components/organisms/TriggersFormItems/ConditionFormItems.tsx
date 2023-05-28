import {useState} from 'react';
import {useFirstMountState} from 'react-use';

import {Form, Input, Select, Space} from 'antd';

import {LabelsSelect} from '@molecules';

import {required} from '@utils/form';

import {useShallowGlobalStore} from '@store/GlobalStore';

import TriggerSelectorSwitcher from './TriggerSelectorSwitcher';

const ConditionFormItems = () => {
  const {triggersKeyMap} = useShallowGlobalStore(state => ({
    triggersKeyMap: state.triggersKeyMap!,
  }));

  const [switcherValue, setSwitcherValue] = useState<string | number>('label');

  const isFirst = useFirstMountState();

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
          const name = getFieldValue('resourceNameSelector');

          const isValid = !(getFieldError('resourceLabelSelector').length > 0);

          if (isFirst) {
            setSwitcherValue(name ? 'name' : 'label');
          }

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
          let eventsOptions;

          const triggerResource = getFieldValue('resource');

          if (events && triggerResource) {
            eventsOptions = events[triggerResource].map((item: string) => ({label: item, value: item}));
          }

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
