import {Form, Select} from 'antd';

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
  remove: (name: number) => void;
  resources?: OptionType[];
  actions?: OptionType[];
  events?: {[key: string]: string[]};
  testsData: any[];
  testSuitesData: any[];
};

const required = [{required: true, message: ''}];

const TriggerItem: React.FC<TriggerItemProps> = props => {
  const {type, resources, actions, name, events, remove, testsData, testSuitesData} = props;

  const renderSelectResource = (placeholder: string, {tests, testSuites}: {tests: any[]; testSuites: any[]}) => {
    return (
      <Select placeholder={placeholder} allowClear optionLabelProp="key">
        {tests.length > 0 ? (
          <OptGroup label="Tests">
            {tests.map((item: any) => (
              <Option key={item.name}>
                <StyledTestOptionWrapper>
                  <TestRunnerIcon icon={item.type as TestExecutor} />
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
      <Text className="small uppercase" color={Colors.slate500}>
        When
      </Text>
      <TriggerFormItem flex={1} name={[name, 'resource']} rules={required}>
        <Select placeholder="K8s resource" options={resources} allowClear />
      </TriggerFormItem>
      <Form.Item noStyle shouldUpdate>
        {({getFieldError, getFieldValue}) => {
          const isValid = !(getFieldError(['triggers', name, 'testSelector']).length > 0);

          return (
            <TriggerFormItem flex={3} name={[name, 'resourceSelector']} rules={required}>
              {type[0] === 'name' ? (
                renderSelectResource('Select resource', {tests: testsData, testSuites: testSuitesData})
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
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => {
          const prevResourceValue = prevValues.triggers[name].resource;
          const curResourceValue = currentValues.triggers[name].resource;

          if (!prevResourceValue || !curResourceValue) {
            return false;
          }

          return prevResourceValue !== curResourceValue;
        }}
      >
        {({getFieldValue, setFieldValue, isFieldTouched}) => {
          let eventsOptions;

          const triggerResource = getFieldValue(['triggers', name, 'resource']);

          if (events && triggerResource) {
            eventsOptions = events[triggerResource].map((item: string) => ({label: item, value: item}));
          }

          if (isFieldTouched(['triggers', name, 'resource'])) {
            setFieldValue(['triggers', name, 'event'], null);
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
        {({getFieldError, getFieldValue}) => {
          const isValid = !(getFieldError(['triggers', name, 'testSelector']).length > 0);

          const actionValue = getFieldValue(['triggers', name, 'action']);
          const isTestSuiteExecution = typeof actionValue === 'string' ? actionValue.includes('suite') : null;

          const resourseData =
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
            <TriggerFormItem flex={3} name={[name, 'testSelector']} rules={required}>
              {type[1] === 'name' ? (
                renderSelectResource('On your testkube resource', resourseData)
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
      <DeleteOutlined style={{cursor: 'pointer', fontSize: '18px'}} onClick={() => remove(name)} />
    </TriggerItemContainer>
  );
};

export default TriggerItem;
