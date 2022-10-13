import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {selectSources} from '@redux/reducers/sourcesSlice';

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
} from '../utils';

const additionalFields: any = {
  'git-dir': gitDirFormFields,
  'git-file': gitFileFormFields,
  'file-uri': fileContentFormFields,
  custom: customTypeFormFields,
  string: stringContentFormFields,
};

const FirstStep: React.FC<any> = props => {
  const {onFileChange, onLabelsChange} = props;

  const executors = useAppSelector(selectExecutors);
  const testSources = useAppSelector(selectSources);

  const remmappedExecutors = remapExecutors(executors);
  const remappedCustomTestSources = remapTestSources(testSources);

  return (
    <StyledFormSpace size={24} direction="vertical">
      {renderFormItems(addTestFormStructure(remmappedExecutors, remappedCustomTestSources), {onLabelsChange})}
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
