import {Form, Select} from 'antd';

import {DeleteOutlined} from '@ant-design/icons';

import {Executor} from '@models/executors';
import {Option as OptionType} from '@models/form';

import {ExecutorIcon} from '@atoms';

import {Input, Text} from '@custom-antd';

import {LabelsSelect} from '@molecules';

import {requiredNoText} from '@utils/form';

import {ReactComponent as TestSuitesIcon} from '@assets/test-suites-icon.svg';

import Colors from '@styles/Colors';

import {getTestExecutorIcon} from '@src/redux/utils/executorIcon';

import {StyledTestOptionWrapper, TextWrapper, TriggerFormItem, TriggerItemContainer} from './Triggers.styled';

const {Option, OptGroup} = Select;

type TriggerItemProps = {
  type: string[];
  name: any;
  remove: (name: number) => void;
  resources?: OptionType[];
  actions?: OptionType[];
  events?: {[key: string]: string[]};
  testsData: any[];
  testSuitesData: any[];
  executors: Executor[];
};

const TriggerItem: React.FC<TriggerItemProps> = props => {
  const {type, resources, actions, name, events, remove, testsData, testSuitesData, executors} = props;

  const renderSelectResource = (placeholder: string, {tests, testSuites}: {tests: any[]; testSuites: any[]}) => {
    return (
      <Select placeholder={placeholder} allowClear optionLabelProp="key">
        {tests.length > 0 ? (
          <OptGroup label="Tests">
            {tests.map((item: any) => (
              <Option key={item.name}>
                <StyledTestOptionWrapper>
                  <ExecutorIcon type={getTestExecutorIcon(executors, item.type)} />
                  <Text className="regular middle">{item.name}</Text>
                </StyledTestOptionWrapper>
              </Option>
            ))}
          </OptGroup>
        ) : null}
        {testSuites.length > 0 ? (
          <OptGroup label="Test Suites">
            {testSuites.map((item: any) => (
              <Option key={item.name}>
                <StyledTestOptionWrapper>
                  <TestSuitesIcon fill={Colors.slate100} />
                  <Text className="regular middle">{item.name}</Text>
                </StyledTestOptionWrapper>
              </Option>
            ))}
          </OptGroup>
        ) : null}
      </Select>
    );
  };

  return (
    <TriggerItemContainer>
      <TextWrapper>
        <Text className="small uppercase" color={Colors.slate500}>
          When
        </Text>
      </TextWrapper>
      <TriggerFormItem flex={1} name={[name, 'resource']} rules={[requiredNoText]}>
        <Select placeholder="K8s resource" options={resources} allowClear />
      </TriggerFormItem>
      <Form.Item noStyle shouldUpdate>
        {({getFieldError, getFieldValue}) => {
          const isValid = !(getFieldError(['triggers', name, 'testSelector']).length > 0);

          const isName = type[0] === 'name';
          const rules = isName
            ? [
                requiredNoText,
                {
                  pattern: /^[a-z0-9][a-z0-9-]+\/[a-z0-9-]+[a-z0-9]$/,
                  message: 'Please specify a valid resource name: e.g. default/my-resource',
                },
              ]
            : [requiredNoText];

          return (
            <TriggerFormItem flex={3} name={[name, 'resourceSelector']} rules={rules}>
              {isName ? (
                <Input placeholder="namespace/resource-name" />
              ) : (
                <LabelsSelect
                  placeholder="Resource labels"
                  defaultLabels={getFieldValue(['triggers', name, 'resourceSelector'])}
                  validation={isValid}
                />
              )}
            </TriggerFormItem>
          );
        }}
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({getFieldValue}) => {
          let eventsOptions;

          const triggerResource = getFieldValue(['triggers', name, 'resource']);

          if (events && triggerResource) {
            eventsOptions = events[triggerResource].map((item: string) => ({label: item, value: item}));
          }

          return (
            <TriggerFormItem flex={1.5} name={[name, 'event']} rules={[requiredNoText]}>
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
      <TextWrapper>
        <Text className="small uppercase" color={Colors.slate500}>
          Do
        </Text>
      </TextWrapper>
      <TriggerFormItem flex={1.5} name={[name, 'action']} rules={[requiredNoText]}>
        <Select placeholder="A specific testkube action" options={actions} allowClear />
      </TriggerFormItem>
      <Form.Item noStyle shouldUpdate>
        {({getFieldError, getFieldValue}) => {
          const isValid = !(getFieldError(['triggers', name, 'testSelector']).length > 0);

          const actionValue = getFieldValue(['triggers', name, 'action']);
          const isTestSuiteExecution = typeof actionValue === 'string' ? actionValue.includes('suite') : null;

          const resourceData =
            isTestSuiteExecution === null
              ? {tests: testsData, testSuites: testSuitesData}
              : isTestSuiteExecution
              ? {
                  tests: [],
                  testSuites: testSuitesData,
                }
              : {
                  tests: testsData,
                  testSuites: [],
                };

          return (
            <TriggerFormItem flex={3} name={[name, 'testSelector']} rules={[requiredNoText]}>
              {type[1] === 'name' ? (
                renderSelectResource('On your testkube resource', resourceData)
              ) : (
                <LabelsSelect
                  placeholder="On your testkube labels"
                  defaultLabels={getFieldValue('triggers')[name].testSelector}
                  validation={isValid}
                />
              )}
            </TriggerFormItem>
          );
        }}
      </Form.Item>
      <TextWrapper>
        <DeleteOutlined style={{cursor: 'pointer', fontSize: '18px'}} onClick={() => remove(name)} />{' '}
      </TextWrapper>
    </TriggerItemContainer>
  );
};

export default TriggerItem;
