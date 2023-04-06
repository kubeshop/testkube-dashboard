import {UploadChangeParam, UploadProps} from 'antd/lib/upload';

import classNames from 'classnames';

import {Input, Upload} from '@custom-antd';

import {StyledUploadWithInputContainer} from './UploadWithInput.styled';

type UploadWithInputProps = {
  onFileChange: (info: UploadChangeParam | null) => void;
  // received from <Form /> parent. Don't specify directly
  onChange?: any;
  // received from <Form /> parent. Don't specify directly
  value?: {
    fileContent: string;
    fileName: string;
  };
  fieldInstance?: boolean;
} & Pick<UploadProps, 'beforeUpload'>;

const defaultBeforeUpload = () => false;

const UploadWithInput: React.FC<UploadWithInputProps> = props => {
  const {onFileChange, beforeUpload = defaultBeforeUpload, value} = props;

  const inputClassNames = classNames({
    'not-empty': value?.fileName,
    'disabled-input': true,
  });

  return (
    <StyledUploadWithInputContainer>
      <Input
        readOnly
        className={inputClassNames}
        value={value?.fileName || ''}
        allowClear
        onChange={() => {
          onFileChange(null);
        }}
        placeholder="Choose a file"
      />
      <Upload maxCount={1} onChange={onFileChange} showUploadList={false} beforeUpload={beforeUpload} />
    </StyledUploadWithInputContainer>
  );
};

export default UploadWithInput;
