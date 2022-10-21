import {Form, FormInstance, Select} from 'antd';

import {DeleteOutlined} from '@ant-design/icons';

import {Option as OptionType} from '@models/form';
import {TestExecutor} from '@models/testExecutors';

import {TestRunnerIcon} from '@atoms';

import {Text} from '@custom-antd';

import {ReactComponent as TestSuitesIcon} from '@assets/test-suites-icon.svg';

import Colors from '@styles/Colors';

import {LabelsSelect} from '@src/components/molecules';

import {StyledTestOptionWrapper, TriggerFormItem, TriggerItemContainer} from './Triggers.styled';

const {Option, OptGroup} = Select;

type TriggerItemProps = {
  type: string[];
  name: any;
  form: FormInstance;
  remove: (name: number) => void;
  resources?: OptionType[];
  actions?: OptionType[];
  events?: {[key: string]: string[]};
  testsData: any[];
  testSuitesData: any[];
};

const required = [{required: true, message: ''}];

const TriggerItem: React.FC<TriggerItemProps> = props => {
  const {type, resources, actions, name, events, remove, form, testsData, testSuitesData} = props;

  const renderSelectResource = (placeholder: string) => {
    return (
      <Select placeholder={placeholder} allowClear optionLabelProp="key">
        <OptGroup label="Tests">
          {testsData.map((item: any) => (
            <Option key={item.name}>
              <StyledTestOptionWrapper>
                <TestRunnerIcon icon={item.type as TestExecutor} />
                <Text className="regular middle">{item.name}</Text>
              </StyledTestOptionWrapper>
            </Option>
          ))}
        </OptGroup>
        <OptGroup label="Test Suites">
          {testSuitesData.map((item: any) => (
            <Option key={item.name}>
              <StyledTestOptionWrapper>
                <TestSuitesIcon fill={Colors.slate100} />
                <Text className="regular middle">{item.name}</Text>
              </StyledTestOptionWrapper>
            </Option>
          ))}
        </OptGroup>
      </Select>
    );
  };

  return (
    <TriggerItemContainer>
      <Text className="small uppercase" color={Colors.slate500}>
        When
      </Text>
      <TriggerFormItem flex={1} name={[name, 'resource']} rules={required}>
        <Select placeholder="K8s resource" options={resources} allowClear />
      </TriggerFormItem>
      <Form.Item noStyle shouldUpdate>
        {() => {
          let isValid = true;

          if (form.getFieldError(['triggers', name, 'resourceSelector']).length > 0) {
            isValid = false;
          }

          return (
            <TriggerFormItem flex={3} name={[name, 'resourceSelector']} rules={required}>
              {type[0] === 'name' ? (
                renderSelectResource('Select resource')
              ) : (
                <LabelsSelect
                  placeholder="Resource labels"
                  defaultLabels={form.getFieldValue('triggers')[name].resourceSelector}
                  validation={isValid}
                />
              )}
            </TriggerFormItem>
          );
        }}
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {() => {
          let eventsOptions;

          const triggerResource = form.getFieldValue('triggers')[name].resource;

          if (events && triggerResource) {
            eventsOptions = events[triggerResource].map((item: string) => ({label: item, value: item}));
          }

          return (
            <TriggerFormItem flex={1.5} name={[name, 'event']} rules={required}>
              <Select
                placeholder="Trigger a cluster event"
                options={eventsOptions}
                allowClear
                disabled={!triggerResource}
              />
            </TriggerFormItem>
          );
        }}
      </Form.Item>
      <Text className="small uppercase" color={Colors.slate500}>
        Do
      </Text>
      <TriggerFormItem flex={1.5} name={[name, 'action']} rules={required}>
        <Select placeholder="A specific testkube action" options={actions} allowClear />
      </TriggerFormItem>
      <Form.Item noStyle shouldUpdate>
        {() => {
          let isValid = true;

          if (form.getFieldError(['triggers', name, 'testSelector']).length > 0) {
            isValid = false;
          }

          return (
            <TriggerFormItem flex={3} name={[name, 'testSelector']} rules={required}>
              {type[1] === 'name' ? (
                renderSelectResource('On your testkube resource')
              ) : (
                <LabelsSelect
                  placeholder="On your testkube labels"
                  defaultLabels={form.getFieldValue('triggers')[name].testSelector}
                  validation={isValid}
                />
              )}
            </TriggerFormItem>
          );
        }}
      </Form.Item>
      <DeleteOutlined style={{cursor: 'pointer', fontSize: '18px'}} onClick={() => remove(name)} />
    </TriggerItemContainer>
  );
};

export default TriggerItem;
