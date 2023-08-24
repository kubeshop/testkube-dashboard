import {FC} from 'react';

import {FormInstance} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

import {UploadWithInput} from '@atoms/UploadWithInput';

import {FormItem} from '@custom-antd/Form/FormItem';

import {required} from '@utils/form';

import {onFileChange} from './FileContentFields/utils';

export const FileContentFields: FC = () => {
  return (
    <FormItem noStyle shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}>
      {form => {
        return (
          <FormItem name="file" label="File" rules={[required]} required>
            <UploadWithInput
              onFileChange={(file: UploadChangeParam | null) => onFileChange(file, form as FormInstance)}
            />
          </FormItem>
        );
      }}
    </FormItem>
  );
};
