import {FormItem} from '@custom-antd';

import {StyledFormSpace} from '@organisms/EntityList/EntityCreationModal/CreationModal.styled';

import {renderFormItems} from '@utils/form';

import {
  addTestFormStructure,
  fileContentFormFields,
  gitDirFormFields,
  gitFileFormFields,
  stringContentFormFields,
} from '../utils';

const additionalFields: any = {
  'git-dir': gitDirFormFields,
  'git-file': gitFileFormFields,
  'file-uri': fileContentFormFields,
  string: stringContentFormFields,
};

const FirstStep: React.FC<any> = props => {
  const {onFileChange} = props;

  return (
    <StyledFormSpace size={24} direction="vertical">
      {renderFormItems(addTestFormStructure)}
      <FormItem
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}
      >
        {({getFieldValue}) => {
          const testSourceValue = getFieldValue('testSource');

          if (testSourceValue) {
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
