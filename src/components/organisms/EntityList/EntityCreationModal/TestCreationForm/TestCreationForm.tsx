import React, {useState} from 'react';

import {Form, FormInstance, Input, Select} from 'antd';

import {Executor} from '@models/executors';
import {Option} from '@models/form';
import {SourceWithRepository} from '@models/sources';
import {AddTestPayload} from '@models/test';

import {Button, FormItem, Text} from '@custom-antd';

import {LabelsSelect, notificationCall} from '@molecules';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {
  CustomFormFields,
  FileContentFields,
  GitCreationFormFields,
  StringContentFields,
} from '@organisms/TestConfigurationForm';

import {remapExecutors} from '@utils/executors';
import {k8sResourceNameMaxLength, k8sResourceNamePattern, required} from '@utils/form';
import {getTestSourceSpecificFields, remapTestSources, testSourceBaseOptions} from '@utils/sources';

import {useAddTestMutation} from '@services/tests';

import {LabelsWrapper, StyledFormSpace} from '../CreationModal.styled';

type TestCreationFormProps = {
  form: FormInstance;
  onSuccess: (res: AddTestPayload) => void;
  onFail: (err: any) => void;
  testSources: SourceWithRepository[];
  executors: Executor[];
};

const additionalFields: {[key: string]: React.FC<any>} = {
  git: GitCreationFormFields,
  'file-uri': FileContentFields,
  custom: CustomFormFields,
  string: StringContentFields,
};

const getAdditionalFields: (source: string, props: any) => JSX.Element = (source, props) => {
  const AdditionalFieldsComponent = additionalFields[source];

  return <AdditionalFieldsComponent {...props} />;
};

const TestCreationForm: React.FC<TestCreationFormProps> = props => {
  const {form, testSources, executors, onSuccess, onFail} = props;

  const remappedExecutors = remapExecutors(executors);
  const remappedCustomTestSources = remapTestSources(testSources);

  const [localLabels, setLocalLabels] = useState<readonly Option[]>([]);

  const [addTest, {isLoading}] = useAddTestMutation();

  const onSave = (values: any) => {
    const {testSource, testType} = values;

    const isTestSourceCustomGitDir = testSource.includes('custom-git-dir');

    if (isTestSourceCustomGitDir) {
      const isTestSourceExists = testSources.some(source => {
        return source.name === testSource.replace('$custom-git-dir-', '');
      });

      if (!isTestSourceExists) {
        notificationCall('failed', 'Provided test source does not exist');
        return;
      }
    }

    const testSourceSpecificFields = getTestSourceSpecificFields(values, isTestSourceCustomGitDir);

    const requestBody = {
      name: values.name,
      type: testType,
      labels: decomposeLabels(localLabels),
      content: {
        ...(testSource === 'file-uri' ? {type: 'string'} : isTestSourceCustomGitDir ? {} : {type: testSource}),
        ...testSourceSpecificFields,
      },
      ...(isTestSourceCustomGitDir ? {source: testSource.replace('$custom-git-dir-', '')} : {}),
    };

    return addTest(requestBody)
      .then(res => {
        onSuccess(res);
      })
      .catch(err => {
        onFail(err);
      });
  };

  return (
    <Form form={form} layout="vertical" name="test-creation" onFinish={onSave} style={{flex: 1}} labelAlign="right">
      <StyledFormSpace size={24} direction="vertical">
        <Text className="regular big">Test details</Text>
        <FormItem
          name="name"
          label="Name"
          rules={[required, k8sResourceNamePattern, k8sResourceNameMaxLength]}
          required
        >
          <Input placeholder="e.g. my-test" />
        </FormItem>
        <FormItem name="testType" label="Type" rules={[required]} required>
          <Select placeholder="Select from available executors..." showSearch options={remappedExecutors} allowClear />
        </FormItem>
        <FormItem
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}
        >
          {({getFieldValue}) => {
            const selectedExecutor = executors.find((executor: Executor) =>
              executor.executor?.types?.includes(getFieldValue('testType'))
            );

            if (!selectedExecutor) {
              return null;
            }

            const options = [
              ...remappedCustomTestSources,
              ...testSourceBaseOptions.filter(option =>
                selectedExecutor.executor?.contentTypes?.includes(String(option.value))
              ),
            ];

            return (
              <FormItem rules={[required]} label="Source" name="testSource" required>
                <Select placeholder="Select suitable source..." options={options} showSearch allowClear />
              </FormItem>
            );
          }}
        </FormItem>
        <FormItem
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}
        >
          {({getFieldValue}) => {
            let testSourceValue: string = getFieldValue('testSource');

            if (!testSourceValue) {
              return null;
            }

            testSourceValue = testSourceValue.includes('custom-git-dir') ? 'custom' : testSourceValue;

            const selectedExecutor = executors.find((executor: any) =>
              executor.executor?.types?.includes(getFieldValue('testType'))
            );
            const executorType = selectedExecutor?.executor.meta?.iconURI;

            const childrenProps: {[key: string]: Object} = {
              git: {executorType},
              custom: {executorType},
            };

            return getAdditionalFields(testSourceValue, childrenProps[testSourceValue] || {});
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
