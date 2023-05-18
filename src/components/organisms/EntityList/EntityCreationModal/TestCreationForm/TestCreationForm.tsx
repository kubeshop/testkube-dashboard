import React, {useMemo, useRef, useState} from 'react';

import {Form, FormInstance, Input, Select} from 'antd';

import {Executor} from '@models/executors';
import {MetadataResponse, RTKResponse} from '@models/fetch';
import {Option} from '@models/form';
import {ErrorNotificationConfig} from '@models/notifications';
import {SourceWithRepository} from '@models/sources';
import {Test} from '@models/test';

import {Button, FormItem, Text} from '@custom-antd';

import {LabelsSelect, NotificationContent} from '@molecules';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {
  CustomCreationFormFields,
  FileContentFields,
  GitCreationFormFields,
  StringContentFields,
} from '@organisms/TestConfigurationForm';
import {Props, SourceFields, SourceType, getAdditionalFieldsComponent} from '@organisms/TestConfigurationForm/utils';

import useInViewport from '@hooks/useInViewport';

import {remapExecutors} from '@utils/executors';
import {k8sResourceNameMaxLength, k8sResourceNamePattern, required} from '@utils/form';
import {
  getCustomSourceField,
  getSourceFieldValue,
  getSourcePayload,
  remapTestSources,
  testSourceBaseOptions,
} from '@utils/sources';

import {useAddTestMutation} from '@services/tests';

import {LabelsWrapper, StyledFormSpace} from '../CreationModal.styled';

type TestCreationFormValues = {
  name: string;
  testType: string;
  testSource: string;
  labels: Option[];
};

type TestCreationFormProps = {
  form: FormInstance<TestCreationFormValues>;
  onSuccess: (res: RTKResponse<MetadataResponse<Test>>) => void;
  testSources: SourceWithRepository[];
  executors: Executor[];
};

const additionalFields: SourceFields = {
  git: GitCreationFormFields,
  'file-uri': FileContentFields,
  custom: CustomCreationFormFields,
  string: StringContentFields,
};

const TestCreationForm: React.FC<TestCreationFormProps> = props => {
  const {form, testSources, executors, onSuccess} = props;

  const remappedExecutors = remapExecutors(executors);
  const remappedCustomTestSources = remapTestSources(testSources);

  const [localLabels, setLocalLabels] = useState<readonly Option[]>([]);
  const [error, setError] = useState<ErrorNotificationConfig | undefined>(undefined);

  const [addTest, {isLoading}] = useAddTestMutation();

  const topRef = useRef<HTMLDivElement>(null);
  const inTopInViewport = useInViewport(topRef);

  const onSave = (values: TestCreationFormValues) => {
    const {testSource, testType} = values;

    const requestBody = {
      name: values.name,
      type: testType,
      labels: decomposeLabels(localLabels),
      content: getSourcePayload(values, testSources),
      ...getCustomSourceField(testSource),
    };

    addTest(requestBody)
      .then(res => {
        onSuccess(res);
      })
      .catch(err => {
        setError(err);

        if (!inTopInViewport && topRef && topRef.current) {
          topRef.current.scrollIntoView();
        }
      });
  };

  const selectedExecutor = useMemo(() => {
    return executors.find((executor: Executor) => executor.executor?.types?.includes(form.getFieldValue('testType')));
  }, [form.getFieldValue('testType')]);

  return (
    <Form form={form} layout="vertical" name="test-creation" onFinish={onSave} style={{flex: 1}} labelAlign="right">
      <div ref={topRef} />
      <StyledFormSpace size={24} direction="vertical">
        <Text className="regular big">Test details</Text>
        {error ? <NotificationContent status="failed" message={error.message} title={error.title} /> : null}
        <FormItem
          name="name"
          label="Name"
          rules={[required, k8sResourceNamePattern, k8sResourceNameMaxLength]}
          required
        >
          <Input placeholder="e.g.: my-test" />
        </FormItem>
        <FormItem name="testType" label="Type" rules={[required]} required>
          <Select placeholder="Select from available executors..." showSearch options={remappedExecutors} />
        </FormItem>
        <FormItem
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}
        >
          {() => {
            if (!selectedExecutor) {
              return null;
            }

            const options = [
              ...remappedCustomTestSources,
              ...testSourceBaseOptions.filter(
                option =>
                  selectedExecutor.executor?.contentTypes?.includes(String(option.value)) ||
                  !selectedExecutor.executor?.contentTypes?.length
              ),
            ];

            return (
              <FormItem rules={[required]} label="Source" name="testSource" required>
                <Select placeholder="Select a source..." options={options} showSearch />
              </FormItem>
            );
          }}
        </FormItem>
        <FormItem
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}
        >
          {({getFieldValue}) => {
            const testSourceValue = getSourceFieldValue(getFieldValue);

            if (!testSourceValue) {
              return null;
            }

            const executorType = selectedExecutor?.executor.meta?.iconURI || 'unknown';

            const childrenProps: Record<SourceType, Partial<Props>> = {
              git: {executorType, getFieldValue},
              custom: {executorType},
              string: {},
              'file-uri': {},
            };

            return getAdditionalFieldsComponent(testSourceValue, additionalFields, childrenProps[testSourceValue]);
          }}
        </FormItem>
        <FormItem
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}
        >
          {({getFieldValue}) => {
            const testSourceValue: string = getFieldValue('testSource');

            if (!testSourceValue) {
              return null;
            }

            return (
              <FormItem label="Labels" name="labels">
                <LabelsWrapper>
                  <LabelsSelect onChange={setLocalLabels} menuPlacement="top" />
                </LabelsWrapper>
              </FormItem>
            );
          }}
        </FormItem>
        <FormItem shouldUpdate>
          {({isFieldsTouched}) => (
            <Button
              htmlType="submit"
              loading={isLoading}
              data-test="add-a-new-test-create-button"
              disabled={isLoading || !isFieldsTouched()}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          )}
        </FormItem>
      </StyledFormSpace>
    </Form>
  );
};

export default TestCreationForm;
