import {useState} from 'react';
import {useFirstMountState} from 'react-use';

import {Form, Select, Space} from 'antd';

import {LabelsSelect} from '@molecules';

import {useShallowGlobalStore} from '@store/GlobalStore';

import {required} from '@utils/form';

import ResourceTriggerSelect from './ResourceTriggerSelect';
import TriggerSelectorSwitcher from './TriggerSelectorSwitcher';

const ActionFormItems = () => {
  const {triggersKeyMap} = useShallowGlobalStore(state => ({
    triggersKeyMap: state.triggersKeyMap!,
  }));

  const [switcherValue, setSwitcherValue] = useState<string | number>('label');

  const isFirst = useFirstMountState();

  const actionOptions = triggersKeyMap?.actions
    .map((actionItem: string) =>
      triggersKeyMap.executions.map(executionItem => {
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
      <Form.Item noStyle shouldUpdate>
        {({getFieldValue}) => {
          const label = getFieldValue('testLabelSelector');
          const name = getFieldValue('testNameSelector');

          if (isFirst) {
            setSwitcherValue(name ? 'name' : 'label');
          }

          return (
            <Space size={16} direction="vertical" style={{width: '100%'}}>
              <TriggerSelectorSwitcher value={switcherValue} onChange={setSwitcherValue} />
              {switcherValue === 'label' ? (
                <Form.Item label="Testkube resource" required name="testLabelSelector" rules={[required]}>
                  <LabelsSelect defaultLabels={label} />
                </Form.Item>
              ) : (
                <ResourceTriggerSelect />
              )}
            </Space>
          );
        }}
      </Form.Item>
    </>
  );
};

export default ActionFormItems;
