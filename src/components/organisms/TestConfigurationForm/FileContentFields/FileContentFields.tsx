import {FormInstance} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

import {UploadWithInput} from '@atoms';

import {FormItem} from '@custom-antd';

import {required} from '@utils/form';

import {onFileChange} from './utils';

const FileContentFields: React.FC = () => {
  return (
    <FormItem noStyle shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}>
      {form => {
        return (
          <FormItem name="file" label="File" rules={[required]} required>
            <UploadWithInput
              onFileChange={(file: Nullable<UploadChangeParam>) => onFileChange(file, form as FormInstance)}
            />
          </FormItem>
        );
      }}
    </FormItem>
  );
};

export default FileContentFields;
