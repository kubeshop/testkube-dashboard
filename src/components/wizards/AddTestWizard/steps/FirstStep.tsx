import {Select} from 'antd';

import {Executor} from '@models/executors';

import {FormItem} from '@custom-antd';

import {StyledFormSpace} from '@organisms/EntityList/EntityCreationModal/CreationModal.styled';

import {renderFormItems} from '@utils/form';

import {
  addTestFormStructure,
  customTypeFormFields,
  fileContentFormFields,
  gitDirFormFields,
  gitFileFormFields,
  remapExecutors,
  remapTestSources,
  stringContentFormFields,
  testSourceBaseOptions,
  testSourceFieldConfig,
} from '../utils';

export const additionalFields: any = {
  'git-dir': gitDirFormFields,
  'git-file': gitFileFormFields,
  'file-uri': fileContentFormFields,
  custom: customTypeFormFields,
  string: stringContentFormFields,
};

const FirstStep: React.FC<any> = props => {
  const {onFileChange, onLabelsChange, executors, testSources} = props;

  const remappedExecutors = remapExecutors(executors);
  const remappedCustomTestSources = remapTestSources(testSources);

  return (
    <StyledFormSpace size={24} direction="vertical">
      {renderFormItems(addTestFormStructure(remappedExecutors), {onLabelsChange})}
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
              ...testSourceBaseOptions.filter(option =>
                selectedExecutor.executor?.contentTypes?.includes(option.value)
              ),
            ];

            return (
              <StyledFormSpace size={24} direction="vertical">
                <FormItem
                  rules={testSourceFieldConfig.rules}
                  label={testSourceFieldConfig.itemLabel}
                  name={testSourceFieldConfig.fieldName}
                  key={testSourceFieldConfig.fieldName}
                  required={testSourceFieldConfig.required}
                  requiredMark={testSourceFieldConfig.required ? undefined : 'optional'}
                >
                  <Select placeholder={testSourceFieldConfig.placeholder} showSearch options={options} />
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

          if (testSourceValue) {
            testSourceValue = testSourceValue.includes('custom-git-dir') ? 'custom' : testSourceValue;

            return (
              <StyledFormSpace size={24} direction="vertical">
                {renderFormItems(additionalFields[testSourceValue], {onFileChange})}
              </StyledFormSpace>
            );
          }
        }}
      </FormItem>
    </StyledFormSpace>
  );
};

export default FirstStep;
