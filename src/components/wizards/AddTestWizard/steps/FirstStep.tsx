import {Select} from 'antd';

import {Executor} from '@models/executors';

import {FormItem} from '@custom-antd';

import {StyledFormSpace, StyledFormSpaceDropdown} from '@organisms/EntityList/EntityCreationModal/CreationModal.styled';

import {renderFormItems} from '@utils/form';

import {
  addTestFormStructure,
  customTypeFormFields,
  fileContentFormFields,
  gitFormFields,
  remapExecutors,
  remapTestSources,
  stringContentFormFields,
  testSourceBaseOptions,
  testSourceFieldConfig,
} from '../utils';

export const additionalFields: any = {
  git: gitFormFields,
  'file-uri': fileContentFormFields,
  custom: customTypeFormFields,
  string: stringContentFormFields,
};

const labels = {
  dataTest: 'test-creation_label_option',
  inputType: 'labels',
  itemLabel: 'Labels',
};

const FirstStep: React.FC<any> = props => {
  const {onFileChange, onLabelsChange, executors, testSources, uriState} = props;

  const remappedExecutors = remapExecutors(executors);
  const remappedCustomTestSources = remapTestSources(testSources);

  return (
    <StyledFormSpace size={24} direction="vertical">
      {renderFormItems(addTestFormStructure(remappedExecutors))}
      <FormItem
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}
      >
        {({getFieldValue}) => {
          const selectedExecutor = executors.find((executor: Executor) =>
            executor.executor?.types?.includes(getFieldValue('testType'))
          );

          if (selectedExecutor) {
            const options = [
              ...remappedCustomTestSources,
              ...testSourceBaseOptions.filter(option => {
                if (option.value === 'git') {
                  return (
                    selectedExecutor.executor?.contentTypes?.includes('git-dir') ||
                    selectedExecutor.executor?.contentTypes?.includes('git-file')
                  );
                }

                return selectedExecutor.executor?.contentTypes?.includes(option.value);
              }),
            ];

            return (
              <StyledFormSpace size={24} direction="vertical">
                <FormItem
                  rules={testSourceFieldConfig.rules}
                  label={testSourceFieldConfig.itemLabel}
                  name={testSourceFieldConfig.fieldName}
                  key={testSourceFieldConfig.fieldName}
                  required={testSourceFieldConfig.required}
                >
                  <Select placeholder={testSourceFieldConfig.placeholder} showSearch options={options} allowClear />
                </FormItem>
              </StyledFormSpace>
            );
          }
        }}
      </FormItem>
      <FormItem
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}
      >
        {({getFieldValue}) => {
          let testSourceValue: string = getFieldValue('testSource');

          const selectedExecutor = executors.find((executor: any) =>
            executor.executor?.types?.includes(getFieldValue('testType'))
          );

          if (testSourceValue) {
            testSourceValue = testSourceValue.includes('custom-git-dir') ? 'custom' : testSourceValue;

            return (
              <StyledFormSpaceDropdown size={24} direction="vertical">
                {renderFormItems(
                  [...additionalFields[testSourceValue](selectedExecutor.executor.meta.iconURI, uriState), labels],
                  {onFileChange, onLabelsChange}
                )}
              </StyledFormSpaceDropdown>
            );
          }
        }}
      </FormItem>
    </StyledFormSpace>
  );
};

export default FirstStep;
