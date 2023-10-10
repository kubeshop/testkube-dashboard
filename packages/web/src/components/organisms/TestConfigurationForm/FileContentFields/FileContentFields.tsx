import {FormInstance} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

import {UploadWithInput} from '@atoms';

import {FormItem} from '@custom-antd';

import {required} from '@utils/form';

import {Props} from '../utils';

import {onFileChange} from './utils';

const FileContentFields: React.FC<Partial<Props>> = ({disabled}) => {
  return (
    <FormItem noStyle shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}>
      {form => {
        return (
          <FormItem name="file" label="File" rules={[required]} required>
            <UploadWithInput
              onFileChange={(file: UploadChangeParam | null) => onFileChange(file, form as FormInstance)}
              disabled={disabled}
            />
          </FormItem>
        );
      }}
    </FormItem>
  );
};

export default FileContentFields;
