import {FormItem} from '@custom-antd';

import renderFormItems from './dada';
import {
  addTestFormStructure,
  fileContentFormFields,
  gitDirFormFields,
  gitFileFormFields,
  stringContentFormFields,
} from './utils';

const additionalFields: any = {
  'git-dir': gitDirFormFields,
  'git-file': gitFileFormFields,
  'file-uri': fileContentFormFields,
  string: stringContentFormFields,
};

const FirstStep: React.FC<any> = props => {
  const {onFileChange} = props;

  return (
    <>
      {renderFormItems(addTestFormStructure)}
      <FormItem
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}
      >
        {({getFieldValue}) => {
          const testSourceValue = getFieldValue('testSource');

          if (testSourceValue) {
            return renderFormItems(additionalFields[testSourceValue], {onFileChange});
          }
        }}
      </FormItem>
    </>
  );
};

export default FirstStep;
